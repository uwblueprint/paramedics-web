'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const saml = require('passport-saml');
const { ApolloServer } = require('apollo-server-express');
const { Op } = require('sequelize');
const db = require('./models');
const { schema } = require('./graphql');

const PORT = 4000;
const HOST = `http://localhost:${PORT}`;
const SESSION_SECRET = 'notsecure';

const samlStrategy = new saml.Strategy(
  {
    path: '/login/callback',
    entryPoint: `https://uwbp-paramedics.us.auth0.com/samlp/${process.env.AUTH0_CLIENT_ID}`,
    acceptedClockSkewMs: -1, // SAML assertion not yet valid fix
    logoutUrl: 'https://uwbp-paramedics.us.auth0.com/v2/logout',
    additionalLogoutParams: {
      // TODO: Move this to env variable
      client_id: process.env.AUTH0_CLIENT_ID,
      federated: '',
      returnTo: 'http://localhost:4000/logout/callback',
    },
  },
  (profile, done) => {
    // TODO: This will need to be changed when we switch to ADFS
    const email =
      profile[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    db.user
      .findOne({
        where: { email: { [Op.like]: email } },
      })
      .then((matchingUser) => {
        // Save the nameId and nameIDFormat for logout
        matchingUser.saml = {};
        matchingUser.saml.nameID = profile.nameID;
        matchingUser.saml.nameIDFormat = profile.nameIDFormat;
        done(
          matchingUser ? null : new Error('Email is not registered: ' + email),
          matchingUser
        );
      });
  }
);

passport.use(samlStrategy);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  done(
    null,
    await db.user.findOne({
      where: { email: { [Op.like]: email } },
    })
  );
});

const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // TODO: Handle login cookie expiring
    // cookie: { maxAge: 1000 },
  })
);

app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', passport.authenticate('saml'));

// TODO: Redirect to frontend auth landing page
app.post('/login/callback', passport.authenticate('saml'), (req, res) => {
  if (!req.user) {
    res.send('Login unsuccessful');
  } else {
    res.send('Login successful!');
  }
});

app.get('/logout', (req, res) => {
  if (req.user == null) {
    res.send('No logged in user!');
    return;
  }
  samlStrategy.logout(req, function (err, uri) {
    // Clear user login session on our end
    res.clearCookie('connect.sid');
    // Redirect to logout callback URL
    return res.redirect(uri);
  });
});
// TODO: Redirect to frontend login screen
app.get('/logout/callback', (req, res) => {
  res.send('Logout callback');
});

// ** setup apollo server + middleware + run
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    getUser: () => req.session,
    logout: () => req.logout(),
  }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

server.applyMiddleware({ app, path: '/' });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at ${HOST}`);
});

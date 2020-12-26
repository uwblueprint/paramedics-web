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
// TODO: Change this session secret
const SESSION_SECRET = 'notsecure';

// This is used to configure login/logout functionality, e.g. the entry point to our IDP,
// the login callback, etc.
const samlStrategy = new saml.Strategy(
  {
    path: '/login/callback',
    entryPoint: `https://uwbp-paramedics.us.auth0.com/samlp/${process.env.AUTH0_CLIENT_ID}`,
    acceptedClockSkewMs: -1, // SAML assertion not yet valid fix
    logoutUrl: 'https://uwbp-paramedics.us.auth0.com/v2/logout',
    additionalLogoutParams: {
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
        // Note: the only field from the user object we need is the email
        const returnVal = {
          userEmail: matchingUser.email,
          saml: {
            nameID: profile.nameID,
            nameIDFormat: profile.nameIDFormat,
          },
        };
        done(
          returnVal.userEmail
            ? null
            : new Error('Email is not registered: ' + email),
          returnVal
        );
      });
  }
);

passport.use(samlStrategy);

/** This saves user.email in the session, under req.session.passport.user,
 *    which is later used by deserializeUser to find the user object and attach
 *    it to req.user. After this operation, req.session.passport.user = user.email */

passport.serializeUser(({ userEmail }, done) => {
  done(null, userEmail);
});

/** This is called with the email that was saved in serializeUser as the
 *     first argument to this function. (i.e. email = user.email). We would then
 *     use the user's email to get the actual user object (using db.user.findOne(...))
 *     Afterwards, the user object is attached to req.user */
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
    //TODO: 24 hours? every week?
  })
);

app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/login', passport.authenticate('saml'));

// TODO: Remove this global variable
let user = null;

// TODO: Redirect to frontend auth landing page
app.post('/login/callback', passport.authenticate('saml'), (req, res, next) => {
  // Redirect to auth landing page
  // TODO: Add environment variable
  console.log("JASON: Login callback");
  res.locals.user = req.user;
  app.locals.user = req.user;
  //res.locals.user = req.user;
  //next();
  return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/events`);
  if (!req.user) {
    res.send('Login unsuccessful');
  } else {
    res.send('Login successful!');
  }
});

app.get('/logout', (req, res) => {
  // If there's no logged in user, just redirect to frontend login screen
  if (req.user == null) {
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`);
  }
  samlStrategy.logout(req, function (err, uri) {
    // Clear user login session on our end
    res.clearCookie('connect.sid');
    // Redirect to logout callback URL
    // Note: this uri is specified in the `returnTo` field of `samlStrategy`'s `additionalLogoutParams`
    return res.redirect(uri);
  });
});
// TODO: Redirect to frontend login screen
app.get('/logout/callback', (req, res) => {
  console.log('JASON: User callback')
  // console.log(req.user);
  // console.log(req.session);
  // console.log(res);
  // Redirect to frontend login screen
  return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`)
});

// ** setup apollo server + middleware + run
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    getUser: () => {
      console.log("JASON: Res");
      console.log(res.locals.user);
      console.log(app.locals.user);
      return app.locals.user;
    },
  }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

server.applyMiddleware({ app, path: '/' });
  
// wrap this in if statement?
app.listen({ port: PORT }, () => {
  /* eslint-disable-next-line no-console */
  console.log(`🚀 Server ready at ${HOST}`);
});

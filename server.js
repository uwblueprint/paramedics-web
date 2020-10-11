'use strict';

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

passport.use(
  new saml.Strategy(
    {
      path: '/login/callback',
      entryPoint:
        'https://uwbp-paramedics.us.auth0.com/samlp/S5q8F6MRwUoeg8VzC9gmkCVjTpNkkZXz',
    },
    (profile, done) => {
      const email =
        profile[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ];
      db.user
        .findOne({
          where: { email: { [Op.like]: email } },
        })
        .then((matchingUser) =>
          done(
            matchingUser
              ? null
              : new Error('Email is not registered: ' + email),
            matchingUser
          )
        );
    }
  )
);

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
    cookie: { maxAge: 1000 },
  })
);

app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', passport.authenticate('saml'));

app.post('/login/callback', passport.authenticate('saml'), (req, res) => {
  console.log('-----------------------------');
  console.log('login call back dumps');
  console.log(req.session);
  console.log(req.user);
  console.log('-----------------------------');
  res.send('Log in Callback Success');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  res.send('Logged out');
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

server.applyMiddleware({ app /* , cors: false */ });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at ${HOST}`));

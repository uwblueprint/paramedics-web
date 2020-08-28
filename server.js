'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const saml = require('passport-saml');
// const fs = require('fs');
// const path = require('path');

const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./graphql');
const PORT = 4000;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

// used for storing user info in session
passport.serializeUser((user, done) => {
  console.log('-----------------------------');
  console.log('serialize user');
  console.log(user);
  console.log('-----------------------------');
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('-----------------------------');
  console.log('deserialize user');
  console.log(user);
  console.log('-----------------------------');
  done(null, user);
});

// passport samlStrategy setup
const samlStrategy = new saml.Strategy(
  {
    callbackUrl: 'http://localhost:4000/login/callback',
    entryPoint:
      'https://uwbp-paramedics.us.auth0.com/samlp/S5q8F6MRwUoeg8VzC9gmkCVjTpNkkZXz',
    issuer: 'urn:uwbp-paramedics.us.auth0.com',
    identifierFormat: null,
    // decryptionPvk: fs.readFileSync(
    //   path.join(__dirname, '/certs/uwbp-paramedics.pem'),
    //   'utf8'
    // ),
    // privateCert: fs.readFileSync(
    //   path.join(__dirname, '/certs/uwbp-paramedics.pem'),
    //   'utf8'
    // ),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true,
  },
  (profile, done) => done(null, profile)
);

passport.use('samlStrategy', samlStrategy);

// probably necessary setup
app.use(passport.initialize({}));
app.use(passport.session({}));

// necessary otherwise we get stuck in an infinite loop within callback
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// login route - this should reroute to IDP
app.get(
  '/login',
  (req, res, next) => {
    console.log('/Start login handler');
    next();
  },
  passport.authenticate('samlStrategy')
);

// login callback - this catches the request from IDP
app.post(
  '/login/callback',
  (req, res, next) => {
    console.log('-----------------------------');
    console.log('/Start login callback ');
    next();
  },
  passport.authenticate('samlStrategy'),
  (req, res) => {
    console.log('-----------------------------');
    console.log('login call back dumps');
    console.log(req.user);
    console.log('-----------------------------');
    res.send('Log in Callback Success');
  }
);

const server = new ApolloServer({ schema });

server.applyMiddleware({ app });

app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));

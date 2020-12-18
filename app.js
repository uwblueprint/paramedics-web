const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const { Op } = require('sequelize');

const db = require('./models');
const { schema } = require('./graphql');

function application({ authStrategy, graphqlPath, sessionSecret }) {
  passport.use(authStrategy);

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
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
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
    // TODO: Redirect to proper unauth screen upon logout
    if (req.user == null) {
      res.send('No logged in user!');
      return;
    }
    authStrategy.logout(req, (err, uri) => {
      // Clear user login session on our end
      res.clearCookie('connect.sid');
      // Redirect to logout callback URL
      // Note: this uri is specified in the `returnTo` field of `authStrategy`'s `additionalLogoutParams`
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

  server.applyMiddleware({ app, path: graphqlPath });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  return httpServer;
}

module.exports = application;

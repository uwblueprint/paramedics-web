'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const saml = require('passport-saml');
const fs = require('fs');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { schema } = require('./graphql');
const PORT = 4000;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

passport.serializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});

const samlStrategy = new saml.Strategy({
    callbackUrl: 'http://localhost:4000/login/callback',
    entryPoint: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
    issuer: 'rowp-saml',
    identifierFormat: null,
    decryptionPvk: fs.readFileSync(__dirname + '/certs/key.pem', 'utf8'),
    privateCert: fs.readFileSync(__dirname + '/certs/key.pem', 'utf8'),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true,
}, function(profile, done) {
    return done(null, profile);
});

passport.use('samlStrategy', samlStrategy);

app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({secret: 'secret',
    resave: false,
    saveUninitialized: true,}));

app.get('/login',
    function (req, res, next) {
        console.log('/Start login handler');
        next();
    },
    passport.authenticate('samlStrategy'),
);

app.post('/login/callback',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login callback ');
        next();
    },
    passport.authenticate('samlStrategy'),
    function (req, res) {
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log(req.user);
        console.log('-----------------------------');
        res.send('Log in Callback Success');
    }
);

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


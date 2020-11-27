const saml = require('passport-saml');

// This is used to configure login/logout functionality, e.g. the entry point to our IDP,
// the login callback, etc.
const samlStrategy = new saml.Strategy(
  {
    path: '/login/callback',
    entryPoint: `https://uwbp-paramedics.us.auth0.com/samlp/${
      process.env.AUTH0_CLIENT_ID
    }`,
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
      .then(matchingUser => {
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

export default samlStrategy;

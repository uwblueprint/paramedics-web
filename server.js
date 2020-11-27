'use strict';

require('dotenv').config();

const application = require('./application');

const PORT = 4000;
const HOST = `http://localhost:${PORT}`;
// TODO: Change this session secret
const SESSION_SECRET = 'notsecure';

if (require.main === module) {
  /* eslint-disable-next-line global-require */
  const authStrategy = require('./config/blueprint_saml_auth0');
  application({
    authStrategy,
    graphqlPath: '/',
    sessionSecret: SESSION_SECRET,
  }).listen({ port: PORT }, () => {
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Server ready at ${HOST}`);
  });
}

'use strict';

require('dotenv').config();

const App = require('./app');

const PORT = 4000;
const HOST = `http://localhost:${PORT}`;
const WEBSOCKET = `ws://localhost:${PORT}/graphql`;
// TODO: change secret and move to env variable
const SESSION_SECRET = 'notsecure';

if (require.main === module) {
  /* eslint-disable-next-line global-require */
  const authStrategy = require('./strategies/bp_saml_auth0');
  App({
    authStrategy,
    graphqlPath: '/',
    sessionSecret: SESSION_SECRET,
  }).listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Server ready at ${HOST}`);
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Subscriptions ready at ${WEBSOCKET}`);
  });
}

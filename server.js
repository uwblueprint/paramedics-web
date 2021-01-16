'use strict';

require('dotenv').config();

const App = require('./app');

// TODO: change secret and move to env variable
const SESSION_SECRET = 'notsecure';

const PORT = 4000;

const hostUrl =
  process.env.REACT_APP_BACKEND_HOST || `http://localhost:${PORT}`;
let webSocketUrl = `ws://localhost:${PORT}/graphql`;
if (process.env.REACT_APP_BACKEND_WEBSOCKET_URL) {
  if (process.env.REACT_APP_BACKEND_WEBSOCKET_URL === '/') {
    const url = new URL(
      process.env.REACT_APP_BACKEND_WEBSOCKET_URL,
      window.location.href
    );
    webSocketUrl = url.protocol.replace('http', 'ws');
  } else {
    webSocketUrl = process.env.REACT_APP_BACKEND_WEBSOCKET_URL;
  }
}

if (require.main === module) {
  /* eslint-disable-next-line global-require */
  const authStrategy = require('./strategies/bp_saml_auth0');
  App({
    authStrategy,
    graphqlPath: '/',
    sessionSecret: SESSION_SECRET,
  }).server.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Server ready at ${hostUrl}`);
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Subscriptions ready at ${webSocketUrl}`);
  });
}

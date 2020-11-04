'use strict';

const { ApolloServer } = require('apollo-server');
const { schema } = require('./graphql');

const server = new ApolloServer({ schema });

server.listen().then(({ url, subscriptionsUrl }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
  // eslint-disable-next-line no-console
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});

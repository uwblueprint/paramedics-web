'use strict';

const { ApolloServer } = require('apollo-server');
const { schema } = require('./graphql');

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});

'use strict';
// const express = require('express');
const { ApolloServer } = require('apollo-server');
const { schema } = require('./graphql');
// const { execute, subscribe } = require('graphql');

const server = new ApolloServer({schema});
// const app = express();

server.listen().then(({ url, subscriptionsUrl }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});

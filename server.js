'use strict';

const { ApolloServer, AuthenticationError } = require('apollo-server');
const { token_valid } = require('./auth')
const { schema } = require('./graphql');
const jwt_decode = require('jwt-decode');
const db = require('./models');
const  { getUser, getScope } = require('./auth');

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    if (!token_valid(token)) {
      throw new AuthenticationError("token invalid");
    }
    const [user, group] = await Promise.all([getUser(token), getScope(token)]);
    if (!user) {
      throw new AuthenticationError("invalid user");
    }
    return { user, group };
  }
    });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});

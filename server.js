'use strict';

const { ApolloServer, AuthenticationError } = require('apollo-server');
const { token_valid } = require('./auth')
const { schema } = require('./graphql');
const db = require('./models');

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    // TODO: Implement getUser and getScope to read JWT
    if (!token_valid(token)) {
      throw new AuthenticationError("token invalid");
    }
    //const user = getUser(token);
    //const scope = getScope(token);
    const user = await db.user.findOne({
      where: {
        email: "capt.holt@asd.com"
      }
    });
    const group = await db.group.findOne({
      where: {
        name: "commander"
      }
    });
    if (!user) {
      throw new AuthenticationError("invalid user");
    }
    return { user, group };
  }
    });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

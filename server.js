'use strict';

const { merge } = require('lodash');
const { userSchema } = require('./schema/user');
const { userResolvers } = require('./resolvers/user');
const { eventSchema } = require('./schema/event');
const { eventResolvers } = require('./resolvers/event');

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { Sequelize } = require('sequelize');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Schema

const Query = `
  type Query {
    _empty: String
  }
`;

const Mutation = `
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [ Query, Mutation, userSchema, eventSchema ],
  resolvers: merge(resolvers, userResolvers, eventResolvers),
});

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

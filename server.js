'use strict';

const { merge } = require('lodash');
const { userSchema } = require('./schema/user');
const { userResolvers } = require('./resolvers/user');
const { eventSchema } = require('./schema/event');
const { eventResolvers } = require('./resolvers/event');
const { patientSchema } = require('./schema/patient');
const { patientResolvers } = require('./resolvers/patient');

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date');
const { makeExecutableSchema } = require('graphql-tools');


const { Sequelize } = require('sequelize');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Schema

const scalars = `
  scalar Date
  scalar Time
  scalar DateTime
`;

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

const resolvers = {
  // Custom scalars
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,

};

const schema = makeExecutableSchema({
  typeDefs: [scalars, Query, Mutation, userSchema, eventSchema, patientSchema],
  resolvers: merge(resolvers, userResolvers, eventResolvers, patientResolvers),
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

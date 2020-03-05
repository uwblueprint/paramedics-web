'use strict';

const { merge } = require('lodash');
const { userSchema } = require('./schema/user');
const { userResolvers } = require('./resolvers/user');
const { eventSchema } = require('./schema/event');
const { eventResolvers } = require('./resolvers/event');
const { patientSchema } = require('./schema/patient');
const { patientResolvers } = require('./resolvers/patient');

const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date');
const { makeExecutableSchema } = require('apollo-server');

const scalars = `
  scalar Date
  scalar Time
  scalar DateTime
`;

// Base query schema, other queries extend this
const Query = `
  type Query {
    _empty: String
  }
`;

// Base mutation schema, other mutations extend this
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

exports.schema = schema;

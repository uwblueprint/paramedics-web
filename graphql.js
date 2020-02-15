'use strict';

const { merge } = require('lodash');
const { userSchema } = require('./schema/user');
const { userResolvers } = require('./resolvers/user');
const { eventSchema } = require('./schema/event');
const { eventResolvers } = require('./resolvers/event');
const { hospitalSchema } = require('./schema/hospital');
const { hospitalResolvers } = require('./resolvers/hospital');
const { ambulanceSchema } = require('./schema/ambulance');
const { ambulanceResolvers } = require('./resolvers/ambulance');

const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date');
const { makeExecutableSchema } = require('graphql-tools');

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
  typeDefs: [ scalars, Query, Mutation, userSchema, eventSchema, hospitalSchema, ambulanceSchema],
  resolvers: merge(resolvers, userResolvers, eventResolvers, hospitalResolvers, ambulanceResolvers),
});

exports.schema = schema;

'use strict';

const { merge } = require('lodash');
const { userSchema } = require('./schema/user');
const { userResolvers } = require('./resolvers/user');
const { eventSchema } = require('./schema/event');
const { eventResolvers } = require('./resolvers/event');

const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date');
const { makeExecutableSchema } = require('graphql-tools');

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
    typeDefs: [ scalars, Query, Mutation, userSchema, eventSchema ],
    resolvers: merge(resolvers, userResolvers, eventResolvers),
});

exports.schema = schema;

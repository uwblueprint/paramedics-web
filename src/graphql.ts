'use strict';

import _ from 'lodash';
import { userSchema } from './schema/user';
import { userResolvers } from './resolvers/user';
import { eventSchema } from './schema/event';
import  { eventResolvers } from './resolvers/event';

import  { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import { makeExecutableSchema } from 'graphql-tools';

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

export const schema = makeExecutableSchema({
    typeDefs: [ scalars, Query, Mutation, userSchema, eventSchema ],
    resolvers: _.merge(resolvers, userResolvers, eventResolvers),
});

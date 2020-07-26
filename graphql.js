"use strict";

const { merge } = require("lodash");
const { userSchema } = require("./schema/user");
const { userResolvers } = require("./resolvers/user");
const { eventSchema } = require("./schema/event");
const { eventResolvers } = require("./resolvers/event");
const { patientSchema } = require("./schema/patient");
const { patientResolvers } = require("./resolvers/patient");
const { collectionPointSchema } = require("./schema/collectionPoint");
const { collectionPointResolvers } = require("./resolvers/collectionPoint");
const { hospitalSchema } = require("./schema/hospital");
const { hospitalResolvers } = require("./resolvers/hospital");
const { ambulanceSchema } = require("./schema/ambulance");
const { ambulanceResolvers } = require("./resolvers/ambulance");
const { locationPinSchema } = require("./schema/locationPin");
const { locationPinResolvers } = require("./resolvers/locationPin");

const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require("graphql-iso-date");
const { makeExecutableSchema } = require("graphql-tools");

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
  typeDefs: [
    scalars,
    Query,
    Mutation,
    userSchema,
    eventSchema,
    hospitalSchema,
    ambulanceSchema,
    collectionPointSchema,
    patientSchema,
    locationPinSchema,
  ],
  resolvers: merge(
    resolvers,
    userResolvers,
    eventResolvers,
    hospitalResolvers,
    ambulanceResolvers,
    collectionPointResolvers,
    patientResolvers,
    locationPinResolvers
  ),
});

exports.schema = schema;

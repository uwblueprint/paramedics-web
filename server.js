'use strict';

const { merge } = require('lodash');
const { userSchema } = require('./schema/user');
const { userResolvers } = require('./resolvers/user');

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { Sequelize } = require('sequelize');

// TODO: this stuff can be set to env variables
const sequelize = new Sequelize('paramedics', 'robot', 'robot_pwd', {
  host: 'paramedics-db',
  dialect: 'postgres'
});


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Schema

const Query = `
  type Query {
    _empty: String
  }
`;

const resolvers = {};
console.log(userSchema);
console.log(merge(resolvers, userResolvers));
const schema = makeExecutableSchema({
  typeDefs: [ Query, userSchema ],
  resolvers: merge(resolvers, userResolvers),
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

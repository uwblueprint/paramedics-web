'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const about = {
  name: "Paramedics API",
  version: 1.0,
  author: "UW Blueprint",
};
// Schema
const typeDefs = `
  type Query { about: About }
  type About { name: String, version: Float, author: String }
`;

const resolvers = {
  Query: { about: () => about },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
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

'use strict';

import { Request, Response } from 'express';
import express from 'express';
import  bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import  { schema } from './graphql';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

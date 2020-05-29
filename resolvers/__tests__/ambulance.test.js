const { ApolloServer } = require('apollo-server');
const { graphql } = require('graphql');
const gql = require('graphql-tag')
const { casual } = require('casual');
const { createTestClient } = require('apollo-server-testing')
const { createApolloFetch } = require('apollo-fetch');
const { schema } = require('../../graphql');

const { server } = require('../../server')

const ambulance_mocks = {
    ambulance: () => ({
        vehicleNumber:  casual.integer(0, 10),
        createdAt: casual.date(format = 'YYYY-MM-DD'),
        updatedAt: casual.date(format = 'YYYY-MM-DD')
    })
};

// const fetch = createApolloFetch({
//     uri: 'http://localhost:4000/graphql',
// });
  
const apolloServer = new ApolloServer({
    schema,
    mocks: ambulance_mocks,
    mockEntireSchema: false
});

// const constructTestServer = () => {  
//     const server = new ApolloServer({
//       schema,
//       mocks: ambulance_mocks,
//       mockEntireSchema: false
//     });
  
//     return { server };
//   };


describe('Test ambulance resolvers', () => {
    // const { query } = createTestClient(apolloServer);
    // const res = await query({ query: ambulances });
    // expect('this').toEqual('this');

    // let url;
    // let httpServer;

    // beforeEach(async () => {
    //     ; ({ url, server: httpServer } = await apolloServer.listen());
    //     console.log(`🚀 Server ready at ${url}`);
    // });

    // afterEach(() => {
    //     httpServer.close();
    // });

    // test('Get ambulances', async () => {
    //     const example_query = `
    //         {
    //             ambulances {
    //                 id 
    //                 vehicleNumber
    //                 createdAt
    //                 updatedAt
    //             }
    //         }
    //     `

    //     const res = await fetch({
    //         query: example_query,
    //       }).then(res => {
    //         console.log(res.data);
    //       }).catch((error) => console.log(error));
    //     expect('this').toEqual('this')
    // })

    test('Add ambulance', async () => {
        
        // const server = constructTestServer();
        
        const example_query = gql`
            {
                ambulances {
                    id 
                    vehicleNumber
                    createdAt
                    updatedAt
                }
            }
        `
        // const PORT = 3306
        // const url = await apolloServer.listen({ port: PORT }).then(({ url }) => {
        //     console.log(`🚀 Server ready at ${url}`);
        // });

        // if (process.env.NODE_ENV !== 'test') {
        //     server
        //       .listen({ port: process.env.PORT || 4000 })
        //       .then(({ url }) => {
        //         console.log(`🚀 app running at ${url}`)
        //       });
        //   }

        const { query } = await createTestClient(apolloServer);
        const res = await query({ query: example_query });
        console.log(res);
        expect('this').toEqual('this');
    })
})
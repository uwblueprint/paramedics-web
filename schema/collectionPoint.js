const collectionPointSchema = `

extend type Query {

    collectionPoint(id: ID!): collectionPoint
    collectionPoints: [collectionPoint]
    collectionPointsByEvent(eventId: ID!): [collectionPoint]

}

extend type Mutation {

    addCollectionPoint(name: String!, eventId: ID!, createdBy: ID!): collectionPoint!
    updateCollectionPoint(id: ID!, name: String, eventId: ID, createdBy: ID): collectionPoint!
    deleteCollectionPoint(id: ID!): Int!

}
type collectionPoint {

    id: ID!
    name: String!
    eventId: Event!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!

}
`;
exports.collectionPointSchema = collectionPointSchema;

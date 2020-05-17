const collectionPointSchema = `

extend type Query {

    collectionPoint(id: ID!): collectionPoint
    collectionPoints: [collectionPoint]

}

extend type Mutation {

    addCollectionPoint(name: String!, eventId: ID!): collectionPoint!
    updateCollectionPoint(id: ID!, name: String, eventId: ID): collectionPoint!
    deleteCollectionPoint(id: ID!): Int!

}
type collectionPoint {

    id: ID!
    name: String!
    eventId: Event!
    createdAt: DateTime!
    updatedAt: DateTime!

}
`
;

exports.collectionPointSchema = collectionPointSchema;
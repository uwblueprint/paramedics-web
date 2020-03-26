const collectionPointSchema = `

extend type Query {

    collectionPoint(id: ID!): collectionPoint
    collectionPoints: [collectionPoint]

}

extend type Mutation {

    addCollectionPoint(name: String!, eventID: ID!): collectionPoint!
    updateCollectionPoint(id: ID!, name: String, eventID: ID): collectionPoint!
    deleteCollectionPoint(id: ID!): Int!

}
type collectionPoint {

    id: ID!
    name: String!
    eventID: Event!
    createdAt: DateTime!
    updatedAt: DateTime!

}
`
;

exports.collectionPointSchema = collectionPointSchema;
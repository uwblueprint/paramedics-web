const collectionPointSchema = `

extend type Query {

    collectionPoint(id: Int!): collectionPoint
    collectionPoints: [collectionPoint]

}
type collectionPoint {

    name: String!
    eventID: Event!
    createdAt: Date!
    updatedAt: Date!

}
`
;

exports.collectionPointSchema = collectionPointSchema;
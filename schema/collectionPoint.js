const collectionPointSchema = `

extend type Query {

    collectionPoint(id: Int!): collectionPoint
    collectionPoints: [collectionPoint]

}
type collectionPoint {

    name: String
    assignedUsers: Int
    eventID: ID
    createdAt: Date
    updatedAt: Date

}
`
;

exports.collectionPointSchema = collectionPointSchema;
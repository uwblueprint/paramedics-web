const incidentSchema = `

extend type Query {

    incident(id: Int!): Incident
    incidents: [Incident]

}
type Incident {

    name: String
    assignedUsers: Int
    eventID: ID
    createdAt: Date
    updatedAt: Date

}
`
;

exports.incidentSchema = incidentSchema;
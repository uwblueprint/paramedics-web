const incidentSchema = `

extend type Query {

    incident(id: Int!): Incident
    incidents: [Incident]

}
type Incident {

    name: String
    assignedUsers: Int
    createdAt: 

}
`
;

exports.incidentSchema = incidentSchema;
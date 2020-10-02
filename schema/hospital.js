const hospitalSchema = `
  extend type Query {
    hospital(id: ID!): Hospital
    hospitals: [Hospital]
  }

  extend type Mutation {
    addHospital(name: String!): Hospital!
    updateHospital(id: ID!, name: String!): Hospital!
    restoreHospital(id: ID!): Hospital!
    deleteHospital(id: ID!): ID!
  }
  
  type Hospital {
    id: ID!
    name: String
    createdAt: DateTime
    updatedAt: DateTime
    events: [Event]
  }
  `;
exports.hospitalSchema = hospitalSchema;

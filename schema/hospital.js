const hospitalSchema = `
  extend type Query {
    hospital(id: ID!): Hospital
    hospitals: [Hospital]
  }

  extend type Mutation {
    addHospital(name: String!): Hospital!
    updateHospital(id: ID!, name: String!): Hospital!
    deleteHospital(id: ID!): Int!
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

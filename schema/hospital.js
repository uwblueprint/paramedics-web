const hospitalSchema = `
  extend type Query {
    hospital(id: Int!): Hospital
    hospitals: [Hospital]
  }

  extend type Mutation {
    addHospital(name: String!): Hospital!
    updateHospital(id: Int!, name: String!): [Int!]!
    deleteHospital(id: Int!): Int!
  }
  
  type Hospital {
    id: Int
    name: String
  }
  `;
exports.hospitalSchema = hospitalSchema;

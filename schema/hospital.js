const hospitalSchema = `
  extend type Query {
    hospital(id: Int!): Hospital
    hospitals: [Hospital]
  }
  
  type Hospital {
    name: String
  }
  `;
exports.hospitalSchema = hospitalSchema;

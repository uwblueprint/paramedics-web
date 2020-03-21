const ambulanceSchema = `
  extend type Query {
    ambulance(id: ID!): Ambulance
    ambulances: [Ambulance]
  }

  extend type Mutation {
    addAmbulance(vehicleNumber: Int!): Ambulance!
    updateAmbulance(id: ID!, vehicleNumber: Int!): Ambulance!
    deleteAmbulance(id: ID!): Int!
  }
  
  type Ambulance {
    id: ID!
    vehicleNumber: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }
  `;
exports.ambulanceSchema = ambulanceSchema;

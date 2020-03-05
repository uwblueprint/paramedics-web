const ambulanceSchema = `
  extend type Query {
    ambulance(id: ID!): Ambulance
    ambulances: [Ambulance]
  }

  extend type Mutation {
    addAmbulance(id: ID!, vehicleNumber: Int!): Ambulance!
    updateAmbulance(id: ID!, vehicleNumber: Int!): Ambulance
    deleteAmbulance(id: ID!): Ambulance
  }
  
  type Ambulance {
    id: ID!
    vehicleNumber: Int!
  }
  `;
exports.ambulanceSchema = ambulanceSchema;

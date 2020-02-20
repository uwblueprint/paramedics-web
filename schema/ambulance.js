const ambulanceSchema = `
  extend type Query {
    ambulance(id: Int!): Ambulance
    ambulances: [Ambulance]
  }

  extend type Mutation {
    addAmbulance(id: Int!, vehicleNumber: Int!): Ambulance!
    updateAmbulance(id: Int!, vehicleNumber: Int!): Ambulance
  }
  
  type Ambulance {
    id: Int!
    vehicleNumber: Int!
  }
  `;
exports.ambulanceSchema = ambulanceSchema;

const ambulanceSchema = `
  extend type Query {
    ambulance(id: Int!): Ambulance
    ambulances: [Ambulance]
  }

  extend type Mutation {
    addAmbulance(number: Int!): Ambulance!
  }
  
  type Ambulance {
    id: Int!
    vehicleNumber: Int!
  }
  `;
exports.ambulanceSchema = ambulanceSchema;

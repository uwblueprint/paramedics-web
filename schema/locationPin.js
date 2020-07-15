const locationPinSchema = `
  extend type Query {
    pin(id: ID!): LocationPin
    pins: [LocationPin]
  }

  extend type Mutation {
    addLocationPin(label: String, eventId: ID!, latitude: Float!, longitude: Float!, address: String): LocationPin!
    updateLocationPin(id: ID!, eventId: ID, label: String, latitude: Float, longitude: Float, address: String): LocationPin!
    deleteLocationPin(id: ID!): Int!
  }
  
  type LocationPin {
    id: ID!
    eventId: Event!
    label: String
    latitude: Float!
    longitude: Float!
    address: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  `;
exports.locationPinSchema = locationPinSchema;

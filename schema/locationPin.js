const locationPinSchema = `
  extend type Query {
    pin(id: ID!): LocationPin
    pins: [LocationPin]
    pinsForEvent(eventId: ID!): [LocationPin]
  }

  extend type Mutation {
    addLocationPin(label: String, eventId: ID!, latitude: Float!, longitude: Float!, address: String): LocationPin!
    updateLocationPin(id: ID!, eventId: ID, label: String, latitude: Float, longitude: Float, address: String): LocationPin!
    restoreLocationPin(id: ID!): LocationPin!
    deleteLocationPin(id: ID!): ID!
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

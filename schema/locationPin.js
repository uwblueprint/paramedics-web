const locationPinSchema = `
  enum pinType {
    EVENT
    CCP
    OTHER
  }

  extend type Query {
    pin(id: ID!): LocationPin
    pins: [LocationPin]
    pinsForEvent(eventId: ID!): [LocationPin]
  }

  extend type Mutation {
    addLocationPin(label: String, eventId: ID!, latitude: Float!, longitude: Float!, address: String, pinType: pinType!, eventParentId: ID, ccpParentId: ID): LocationPin!
    updateLocationPin(id: ID!, eventId: ID, label: String, latitude: Float, longitude: Float, address: String, pinType: pinType, eventParentId: ID, ccpParentId: ID): LocationPin!
    restoreLocationPin(id: ID!): LocationPin!
    deleteLocationPin(id: ID!): ID!
  }
  
  type LocationPin {
    id: ID!
    eventId: Event!
    label: String
    latitude: Float!
    longitude: Float!
    pinType: pinType!
    eventParentId: Event
    ccpParentId: collectionPoint
    address: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  `;
exports.locationPinSchema = locationPinSchema;

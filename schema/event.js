const eventSchema = `
  extend type Query {
    event(id: ID!): Event
    events: [Event]
  }

  input AmbulanceInput {
    id: ID!
  }

  input HospitalInput {
    id: ID!
  }
  
  extend type Mutation {
    addEvent(name: String!, eventDate: Date!, createdBy: ID!, isActive: Boolean!): Event
    updateEvent(id: ID!, name: String, eventDate: Date, createdBy: ID, isActive: Boolean, ambulances: [AmbulanceInput], hospitals: [HospitalInput]): Event
    addAmbulancesToEvent(eventId: ID!, ambulances: [AmbulanceInput]!): Event
    addHospitalsToEvent(eventId: ID!, hospitals: [HospitalInput]!): Event
    deleteAmbulancesFromEvent(eventId: ID!, ambulances: [AmbulanceInput]!): Event
    deleteHospitalsFromEvent(eventId: ID!, hospitals: [HospitalInput]!): Event
    deleteEvent(id: ID!): Int!
  }

  type Event {
    id: ID!
    name: String!
    eventDate: Date!
    createdBy: User!
    isActive: Boolean!
    createdAt: DateTime
    updatedAt: DateTime
    ambulances: [Ambulance]
    hospitals: [Hospital]
  }
  `;
exports.eventSchema = eventSchema;

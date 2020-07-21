const eventSchema = `
  extend type Query {
    event(id: ID!): Event
    events: [Event]
  }

  input AmbulanceInput {
    id: ID
  }

  input HospitalInput {
    id: ID
  }
  
  extend type Mutation {
    addEvent(name: String!, eventDate: Date!, createdBy: ID!, isActive: Boolean!): Event
    updateEvent(id: ID!, name: String, eventDate: Date, createdBy: ID, isActive: Boolean, ambulances: [AmbulanceInput], hospitals: [HospitalInput]): Event
    addAmbulanceToEvent(eventId: ID!, ambulanceId: AmbulanceInput!): Event
    addHospitalToEvent(eventId: ID!, hospitalId: HospitalInput!): Event
    restoreEvent(eventId: ID!): Event!
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

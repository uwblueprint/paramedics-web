const eventSchema = `
  extend type Query {
    event(id: ID!): Event
    events: [Event]
  }
  
  extend type Mutation {
    addEvent(name: String!, eventDate: Date!, createdBy: ID!, isActive: Boolean!): Event
    updateEvent(id: ID!, name: String, eventDate: Date, createdBy: ID, isActive: Boolean): Event
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
  }
  `;
exports.eventSchema = eventSchema;

const eventSchema = `
  extend type Query {
    event(id: Int!): Event
    events: [Event]
  }
  
  type Event {
    id: ID!
    name: String
    date: DateTime
    createdBy: User
    isActive: Boolean
    description: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  `;
exports.eventSchema = eventSchema;

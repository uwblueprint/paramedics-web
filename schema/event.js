const eventSchema = `
  extend type Query {
    event(id: Int!): Event
    events: [Event]
  }
  
  type Event {
    id: ID!
    name: String
    date: String
    createdBy: User
    isActive: Boolean
    description: String
  }
  `;
exports.eventSchema = eventSchema;

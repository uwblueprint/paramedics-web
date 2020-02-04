const eventSchema = `
  extend type Query {
    event(id: Int!): Event
    events: [Event]
  }
  
  type Event {
    id: ID!
    name: String
    date: String
    createdBy: Int
    isActive: Boolean
    description: String
  }
  `;
exports.eventSchema = eventSchema;

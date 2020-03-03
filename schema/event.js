const eventSchema = `
  extend type Query {
    event(id: Int!): Event
    events: [Event]
  }
  
  extend type Mutation {
    addEvent(name: String!, eventDate: Date!, createdBy: Int!, isActive: Boolean!): Event!
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

const eventSchema = `
  extend type Query {
    event(id: Int!): Event
    events: [Event]
  }
  
  type Event {
    id: ID!
    name: String
    pin: String
    description: String
  }
  `
;

exports.eventSchema = eventSchema;

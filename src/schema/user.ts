export const userSchema = `
  enum accessLevel {
    COMMANDER
    SUPERVISOR
    ADMIN
  }  

  extend type Query {
    user(id: Int!): User
    users: [User]
  }
  
  extend type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!,  password: String!): User!
  }
  
  type User {
    accessLevel: accessLevel
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    emergencyContact: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  `
;

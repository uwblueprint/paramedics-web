const userSchema = `
  enum accessLevel {
    COMMANDER
    SUPERVISOR
    ADMIN
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
    currentUser: User
    userByEmail: User
  }
  
  extend type Mutation {
    addUser(name: String!, email: String!, password: String!, accessLevel: accessLevel!, emergencyContact: String!): User!
    updateUser(id: ID!, accessLevel: accessLevel, name: String, email: String,
      emergencyContact: String): User!
    restoreUser(id: ID!): User!
    deleteUser(id: ID!): ID!
  }
  
  type User {
    accessLevel: accessLevel
    id: ID!
    name: String!
    email: String!
    emergencyContact: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthPayload {
    user: User
  }
  `;
exports.userSchema = userSchema;

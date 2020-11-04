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
<<<<<<< HEAD
    deleteUser(id: ID!): Int!
    login(body: String!): AuthPayload
    logout: Boolean
||||||| merged common ancestors
    deleteUser(id: ID!): Int!
=======
    deleteUser(id: ID!): ID!
>>>>>>> 475c13e74581f8a68e901f0032cb6a47ee7120d0
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

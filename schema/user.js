const userSchema = `
  extend type Query {
    user(id: ID!): User
    users: [User]
  }
  
  extend type Mutation {
    addUser(name: String!, email: String!, password: String!, role: Role!, emergencyContact: String!): User!
    updateUser(id: ID!, role: Role, name: String, email: String,
      emergencyContact: String): User!
    restoreUser(id: ID!): User!
    deleteUser(id: ID!): ID!
  }
  
  type User {
    role: Role
    id: ID!
    name: String!
    email: String!
    emergencyContact: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  `;
exports.userSchema = userSchema;

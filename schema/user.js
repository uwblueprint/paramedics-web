const userSchema = `
  extend type Query {
    user(id: ID!): User
    users: [User]
  }
  
  extend type Mutation {
    addUser(name: String!, email: String!, roleId: ID!): User!
    updateUser(id: ID!, roleId: ID, name: String, email: String): User!
    restoreUser(id: ID!): User!
    deleteUser(id: ID!): ID!
  }
  
  type User {
    roleId: ID!
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
  `;
exports.userSchema = userSchema;

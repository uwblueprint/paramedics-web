const userSchema = `
  extend type Query {
    user(id: ID!): User
    users: [User]
  }
  
  extend type Mutation {
    addUser(name: String!, email: String!, password: String!, roleId: ID!, emergencyContact: String!): User!
    updateUser(id: ID!, roleId: ID, name: String, email: String,
      emergencyContact: String): User!
    restoreUser(id: ID!): User!
    deleteUser(id: ID!): ID!
  }
  
  type User {
    roleId: ID!
    id: ID!
    name: String!
    email: String!
    emergencyContact: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  `;
exports.userSchema = userSchema;

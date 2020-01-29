const userSchema = `
  extend type Query {
    user(id: Int!): User
    users: [User]
  }
  
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
  }
  `
;

exports.userSchema = userSchema;

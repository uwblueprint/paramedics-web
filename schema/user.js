const userSchema = `
  extend type Query {
    user(id: Int!): User
    users: [User]
  }
  
  type User {
    firstName: String
    lastName: String
    email: String
  }
  `
;

exports.userSchema = userSchema;

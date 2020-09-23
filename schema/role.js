const roleSchema = `
  extend type Query {
    roles: [Role]
  }

  type Role {
    id: ID!,
    name: String!,
    displayName: String!
  }
  `;
exports.roleSchema = roleSchema;

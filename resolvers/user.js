'use strict';

const db = require('../models');
const validators = require('../utils/validators');

const userResolvers = {
  Query: {
    users: () => db.user.findAll(),
    user: (parent, args) => db.user.findByPk(args.id),
  },
  Mutation: {
    addUser: (parent, args) =>
      db.user.create({
        name: args.name,
        email: args.email,
        password: args.password,
        accessLevel: args.accessLevel,
        emergencyContact: args.emergencyContact,
      }),
    updateUser: (parent, args) =>
      db.user
        .update(
          {
            name: args.name,
            email: args.email,
            accessLevel: args.accessLevel,
            emergencyContact: args.emergencyContact,
          },
          {
            where: {
              id: args.id,
            },
          }
        )
        .then((rowsAffected) => {
          if (rowsAffected[0] === 0) {
            throw new Error('Update failed for user ID: ' + args.id);
          }
          return db.user.findByPk(args.id);
        }),
    restoreUser: async (parent, args) => {
      await validators.validateUser(args.id, true).catch((error) => {
        throw error;
      });
      await db.user.restore({
        where: {
          id: args.id,
        },
      });
      return db.user.findByPk(args.id);
    },
    deleteUser: (parent, args) =>
      db.user.destroy({
        where: {
          id: args.id,
        },
      }),
  },
};

exports.userResolvers = userResolvers;

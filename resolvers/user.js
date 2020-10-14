'use strict';

const db = require('../models');
const { Roles } = require('../utils/enum');
const validators = require('../utils/validators');

const userResolvers = {
  Query: {
    users: () => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.user.findAll();
    },
    user: (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.user.findByPk(args.id);
    },
  },
  Mutation: {
    addUser: (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.user.create({
        name: args.name,
        email: args.email,
        password: args.password,
        accessLevel: args.accessLevel,
        emergencyContact: args.emergencyContact,
      });
    },
    updateUser: (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.user
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
        });
    },
    restoreUser: async (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      await validators.validateUser(args.id, true);
      await db.user.restore({
        where: {
          id: args.id,
        },
      });
      return db.user.findByPk(args.id);
    },
    deleteUser: (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.user
        .destroy({
          where: {
            id: args.id,
          },
        })
        .then((isDeleted) => {
          if (isDeleted === 1) {
            return args.id;
          }
          throw new Error('Deletion failed for user ID: ' + args.id);
        });
    },
  },
};

exports.userResolvers = userResolvers;

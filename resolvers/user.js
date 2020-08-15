'use strict';

const db = require('../models');
const { AuthenticationError } = require('apollo-server');

const userResolvers = {
  Query: {
    users: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'read_user')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError('Unauthorized. User not read.');
          }
        });
      db.user.findAll();
    },
    user: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'read_user')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError('Unauthorized. User not read.');
          }
        });
      return db.user.findByPk(args.id);
    },
  },
  Mutation: {
    addUser: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'create_user')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError('Unauthorized. User not created.');
          }
        });
      return db.user.create({
        name: args.name,
        email: args.email,
        password: args.password,
        accessLevel: args.accessLevel,
        emergencyContact: args.emergencyContact,
      });
    },
    updateUser: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'update_user')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError('Unauthorized. User not updated.');
          }
        });
      await db.user
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
            throw new Error('Update failed for user table');
          }
        });

      return db.user.findByPk(args.id);
    },
    restoreUser: async (parent, args) => {
      await db.user.restore({
        where: {
          id: args.id,
        },
      });

      return db.user.findByPk(args.id);
    },
    deleteUser: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'delete_user')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError('Unauthorized. User not deleted.');
          }
        });

      return db.user.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.userResolvers = userResolvers;

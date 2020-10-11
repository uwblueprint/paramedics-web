'use strict';

const { Op } = require('sequelize');
const db = require('../models');

const userResolvers = {
  Query: {
    users: () => db.user.findAll(),
    user: (parent, args) => db.user.findByPk(args.id),
    currentUser: (parent, args, context) => context.getUser(),
    userByEmail: (parent, args) =>
      db.user.findOne({ where: { email: { [Op.like]: args.email } } }),
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
    restoreUser: (parent, args) =>
      db.user
        .restore({
          where: {
            id: args.id,
          },
        })
        .then(() => db.user.findByPk(args.id)),
    deleteUser: (parent, args) =>
      db.user.destroy({
        where: {
          id: args.id,
        },
      }),
    // login: async (parent, args, context) => {
    //   console.log('**** LOGIN RESOLVER');
    //   console.log(args);
    //   const { user } = await context.authenticate('graphql-local', args);
    //   context.login(user);
    //   return { user };
    // },
    logout: (parent, args, context) => context.logout(),
  },
};

exports.userResolvers = userResolvers;

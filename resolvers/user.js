'use strict';

const db = require('../models');

const userResolvers = {
    Query: {
        users: () =>  db.user.findAll(),
        user(obj, args, context, info) {
            return db.user.findByPk(args.id);
        },
    },
    Mutation: {
        addUser: (parent, args) => {
            const user = db.user.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: args.password
            });
            return user;
        }
    },
};

exports.userResolvers =  userResolvers;

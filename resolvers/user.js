'use strict';

const db = require('../models');

const userResolvers = {
    Query: {
        users: () =>  db.user.findAll(),
        user(obj, args, context, info) {
            return db.user.findByPk(args.id);
        },

    },
};

exports.userResolvers =  userResolvers;

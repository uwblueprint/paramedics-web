'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('../models/user');
const userResolvers = {
    Query: {
        users: () =>  User.findAll(),
        user(obj, args, context, info) {
            return User.findByPk(args.id);
        },

    },
};

exports.userResolvers = userResolvers;

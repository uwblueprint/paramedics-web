'use strict';

const db = require('../models');
const { AuthenticationError } = require('apollo-server');

const userResolvers = {
    Query: {
        users: async (obj, args, context) => {
            let hasPerms = context.group.hasPerm(context.group.id, "read_user");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. User not read.");
            }
            return db.user.findAll();
        },
        user(obj, args, context, info) {
            return db.user.findByPk(args.id);
        },
    },
    Mutation: {
        addUser: async (parent, args, context) => {

            let hasPerms = context.group.hasPerm(context.group.id, "create_user");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. User not created.");
            }

            return db.user.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: args.password,
                accessLevel: args.accessLevel,
                emergencyContact: args.emergencyContact
            });
        },
        updateUser: async (parent, args, context) => {

            let hasPerms = context.group.hasPerm(context.group.id, "update_user");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. User not updated.");
            }


            await db.user.update({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                accessLevel: args.accessLevel,
                emergencyContact: args.emergencyContact
            }, {
                where: {
                    id: args.id
                }
            }).then(rowsAffected => {
                if(rowsAffected[0] === 0) {
                    throw new Error("Update failed for user table"); 
                }
            });

            return db.user.findByPk(args.id);
        },
        deleteUser: (parent, args, context) => {

            let hasPerms = context.group.hasPerm(context.group.id, "delete_user");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. User not deleted.");
            }

            return db.user.destroy({
                where: {
                    id: args.id
                }
            })
        }
    },
};

exports.userResolvers =  userResolvers;

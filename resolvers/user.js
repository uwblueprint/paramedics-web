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
            return db.user.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: args.password,
                accessLevel: args.accessLevel,
                emergencyContact: args.emergencyContact
            });
        },
        updateUser: async (parent, args) => {
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
        deleteUser: (parent, args) => {
            return db.user.destroy({
                where: {
                    id: args.id
                }
            })
        }
    },
};

exports.userResolvers =  userResolvers;

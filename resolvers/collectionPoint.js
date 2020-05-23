'use strict';

const db = require('../models');

const collectionPointResolvers = {
    Query: {
        collectionPoints: async (obj, args, context, info) =>  {
            let hasPerm = await context.group.hasPerm(context.group.id, "read_collection_point");
            if (!hasPerm) {
              throw new AuthenticationError("Unauthorized. Collection point not read.");
            }
            return db.collectionPoint.findAll();
        },
        collectionPoint: async (obj, args, context, info) => {
            let hasPerm = await context.group.hasPerm("read_collection_point");
            if (!hasPerm) {
              throw new AuthenticationError("Unauthorized. Collection point not read.");
            }
            db.collectionPoint.findByPk(args.id)
        }
    },

    collectionPoint: {
        eventId: (obj, args, context, info) => db.event.findByPk(obj.eventId)
    },

    // CRUD Operations
    Mutation:  {
        addCollectionPoint: async (parent, args) => {

            let hasPerm = await context.group.hasPerm(context.group.id, "create_collection_point");
            if (!hasPerm) {
              throw new AuthenticationError("Unauthorized. Collection point not created.");
            }
            //Checks if eventId is valid
            const event =  await db.event.findByPk(args.eventId);
            
            if (!event) {
                throw new Error("Invalid event ID");
            }
            return db.collectionPoint.create({
                name: args.name,
                eventId: args.eventId
            });

        },
        updateCollectionPoint: async (parent,args) => {

            let hasPerm = await context.group.hasPerm(context.group.id, "update_collection_point");
            if (!hasPerm) {
              throw new AuthenticationError("Unauthorized. Collection point not updated.");
            }

            //Checks if eventId is valid
            if (args.eventId) {
                const event = await db.event.findByPk(args.eventId);
                if (!event) {
                    throw new Error("Invalid event ID");
                }
            }

            await db.collectionPoint.update({
                name: args.name,
                eventId: args.eventId
            },
            {
            where: {
                id: args.id
            }
            }).then(rowsAffected => {

                if (rowsAffected[0] == 0) {
                    throw new Error("this Collection Point does not exist");
                }

            });
            return db.collectionPoint.findByPk(args.id);
        },
        deleteCollectionPoint: async (parent, args) => {

            let hasPerm = await context.group.hasPerm(context.group.id, "delete_collection_point");
            if (!hasPerm) {
              throw new AuthenticationError("Unauthorized. Collection point not read.");
            }

        // Return status for destroy
        // 1 for successful deletion, 0 otherwise
            return db.collectionPoint.destroy({

                where: {
                    id: args.id
                }
            });
        }
    }
};

exports.collectionPointResolvers = collectionPointResolvers;

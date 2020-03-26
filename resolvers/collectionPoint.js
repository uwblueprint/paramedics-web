'use strict';

const db = require('../models');

const collectionPointResolvers = {
    Query: {
        collectionPoints: () =>  db.collectionPoint.findAll(),
        collectionPoint: (obj, args, context, info) => db.collectionPoint.findByPk(args.id)
    },

    collectionPoint: {
        eventID: (obj, args, context, info) => db.event.findByPk(obj.eventID)
    },

    // CRUD Operations
    Mutation:  {
        addCollectionPoint: async (parent, args) => {
            //Checks if eventID is valid
            const event = await db.collectionPoint.findByPk(args.eventID);
            if (!event) {
                throw new Error("Invalid event ID");
            }
            return db.collectionPoint.create({
                name: args.name,
                eventID: args.eventID
            });

        },
        updateCollectionPoint: async (parent,args) => {

            //Checks if eventID is valid
            if (args.eventID) {
                const event = await db.collectionPoint.findByPk(args.eventID);
                if (!event) {
                    throw new Error("Invalid event ID");
                }
            }

            await db.collectionPoint.update({
                name: args.name,
                eventID: args.eventID
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
        deleteCollectionPoint: (parent, args) => {
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

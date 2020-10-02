'use strict';

const db = require('../models');
const validators = require('../utils/validators');

// hi
const collectionPointResolvers = {
  Query: {
    collectionPoints: () => db.collectionPoint.findAll(),
    collectionPoint: (parent, args) => db.collectionPoint.findByPk(args.id),
    collectionPointsByEvent: (parent, args) =>
      db.collectionPoint.findAll({ where: { eventId: args.eventId } }),
  },

  collectionPoint: {
    eventId: (parent) => db.event.findByPk(parent.eventId),
    createdBy: (parent) => db.user.findByPk(parent.createdBy),
  },

  // CRUD Operations
  Mutation: {
    addCollectionPoint: (parent, args) =>
      // Check if user & event is valid
      Promise.all([
        validators.validateUser(args.createdBy),
        validators.validateEvent(args.eventId),
      ]).then(() =>
        db.collectionPoint.create({
          name: args.name,
          eventId: args.eventId,
          createdBy: args.createdBy,
        })
      ),
    updateCollectionPoint: async (parent, args) => {
      // Checks if event is valid
      if (args.eventId) {
        await validators.validateEvent(args.eventId);
      }

      // Checks if user is valid:
      if (args.createdBy) {
        await validators.validateUser(args.createdBy);
      }

      await db.collectionPoint
        .update(
          {
            name: args.name,
            eventId: args.eventId,
            createdBy: args.createdBy,
          },
          {
            where: {
              id: args.id,
            },
          }
        )
        .then((rowsAffected) => {
          if (rowsAffected[0] === 0) {
            throw new Error('Failed update for ambulance ID: ' + args.id);
          }
        });
      return db.collectionPoint.findByPk(args.id);
    },
    restoreCollectionPoint: (parent, args) =>
      db.collectionPoint
        .restore({
          where: {
            id: args.id,
          },
          individualHooks: true,
        })
        .then(() => db.collectionPoint.findByPk(args.id)),
    deleteCollectionPoint: (parent, args) =>
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      db.collectionPoint.destroy({
        where: {
          id: args.id,
        },
        individualHooks: true,
      }),
  },
};

exports.collectionPointResolvers = collectionPointResolvers;

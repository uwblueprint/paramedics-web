'use strict';

const db = require('../models');

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
        db.user.findByPk(args.createdBy).then((user) => {
          if (!user) {
            throw new Error('Invalid user ID: ' + args.createdBy);
          }
        }),
        db.event.findByPk(args.eventId).then((event) => {
          if (!event) {
            throw new Error('Invalid event ID: ' + args.eventId);
          }
        }),
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
        await db.event.findByPk(args.eventId).then((event) => {
          if (!event) {
            throw new Error('Invalid event ID: ' + args.eventId);
          }
        });
      }

      // Checks if user is valid:
      if (args.createdBy) {
        await db.user.findByPk(args.createdBy).then((user) => {
          if (!user) {
            throw new Error('Invalid user ID: ' + args.createdBy);
          }
        });
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
            throw new Error('This Collection Point does not exist');
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

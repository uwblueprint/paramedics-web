'use strict';

const db = require('../models');
const validators = require('../utils/validators');

const collectionPointResolvers = {

  Query: {
    collectionPoints: () => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR', 'DISPATCH']);
      db.collectionPoint.findAll();
    },
    collectionPoint: (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR', 'DISPATCH']);
      db.collectionPoint.findByPk(args.id);
    },
    // TODO: Clarify
    collectionPointsByEvent: (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR', 'DISPATCH']);
      db.collectionPoint.findAll({ where: { eventId: args.eventId } });
    },
  },

  collectionPoint: {
    eventId: (parent) => db.event.findByPk(parent.eventId),
    createdBy: (parent) => db.user.findByPk(parent.createdBy),
  },

  // CRUD Operations
  Mutation: {
    addCollectionPoint: (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR']);
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
      );
    },
    updateCollectionPoint: async (parent, args) => {
      // TODO: ask for role
      validators.validateRole(['ADMIN', 'COMMANDER']);
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
    restoreCollectionPoint: (parent, args) => {
      validators.validateRole(['ADMIN', 'COMMANDER']);
      db.collectionPoint
        .restore({
          where: {
            id: args.id,
          },
          individualHooks: true,
        })
        .then(() => db.collectionPoint.findByPk(args.id));
    },
    deleteCollectionPoint: (parent, args) => {
      validators.validateRole(['ADMIN', 'COMMANDER']);
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      db.collectionPoint.destroy({
        where: {
          id: args.id,
        },
        individualHooks: true,
      });
    },
  },
};

exports.collectionPointResolvers = collectionPointResolvers;

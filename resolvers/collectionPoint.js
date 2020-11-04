'use strict';

const db = require('../models');
const { Roles } = require('../utils/enum');
const validators = require('../utils/validators');

const collectionPointResolvers = {
  Query: {
    collectionPoints: () => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.collectionPoint.findAll();
    },
    collectionPoint: (parent, args) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.collectionPoint.findByPk(args.id);
    },
    collectionPointsByEvent: (parent, args) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.collectionPoint.findAll({ where: { eventId: args.eventId } });
    },
  },
  collectionPoint: {
    eventId: (parent) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.event.findByPk(parent.eventId);
    },
    createdBy: (parent) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.user.findByPk(parent.createdBy);
    },
  },
  // CRUD Operations
  Mutation: {
    addCollectionPoint: (parent, args) => {
      validators.validateRole(
        [Roles.COMMANDER, Roles.SUPERVISOR],
        validators.demoRole
      );
      // Check if user & event is valid
      return Promise.all([
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
      validators.validateRole(
        [Roles.COMMANDER, Roles.SUPERVISOR],
        validators.demoRole
      );
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
            throw new Error('Failed update for CCP ID: ' + args.id);
          }
        });
      return db.collectionPoint.findByPk(args.id);
    },
    restoreCollectionPoint: async (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      await validators.validateCollectionPoint(args.id, true);
      await db.collectionPoint.restore({
        where: {
          id: args.id,
        },
        individualHooks: true,
      });
      return db.collectionPoint.findByPk(args.id);
    },
    deleteCollectionPoint: (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.collectionPoint
        .destroy({
          where: {
            id: args.id,
          },
          individualHooks: true,
        })
        .then((isDeleted) => {
          if (isDeleted === 1) {
            return args.id;
          }
          throw new Error('Deletion failed for CCP ID: ' + args.id);
        });
    },
  },
};

exports.collectionPointResolvers = collectionPointResolvers;

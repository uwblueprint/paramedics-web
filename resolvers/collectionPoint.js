'use strict';

const db = require('../models');
const { AuthenticationError } = require('apollo-server');

const collectionPointResolvers = {
  Query: {
    collectionPoints: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'read_collection_point')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Collection point not read.'
            );
          }
        });
      return db.collectionPoint.findAll();
    },
    collectionPoint: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'delete_collection_point')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Collection point not deleted.'
            );
          }
        });
      return db.collectionPoint.findByPk(args.id);
    },
    collectionPointsByEvent: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'delete_collection_point')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Collection point not deleted.'
            );
          }
        });
      return db.collectionPoint.findAll({ where: { eventId: args.eventId } });
    },
  },

  collectionPoint: {
    eventId: (parent) => db.event.findByPk(parent.eventId),
    createdBy: (parent) => db.user.findByPk(parent.createdBy),
  },

  // CRUD Operations
  Mutation: {
    addCollectionPoint: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'create_collection_point')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Collection point not created.'
            );
          }
        });
      // Checks if eventId is valid
      const event = await db.event.findByPk(args.eventId);

      // Check if createdBy is valid
      const user = await db.user.findByPk(args.createdBy);
      if (!user) {
        throw new Error('Invalid user ID');
      }

      if (!event) {
        throw new Error('Invalid event ID');
      }
      return db.collectionPoint.create({
        name: args.name,
        eventId: args.eventId,
        createdBy: args.createdBy,
      });
    },
    updateCollectionPoint: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'update_collection_point')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Collection point not updated.'
            );
          }
        });
      // Checks if eventId is valid
      if (args.eventId) {
        const event = await db.event.findByPk(args.eventId);
        if (!event) {
          throw new Error('Invalid event ID');
        }
      }

      // Checks if createdBy is valid:
      if (args.createdBy) {
        const user = await db.user.findByPk(args.createdBy);
        if (!user) {
          throw new Error('Invalid user ID');
        }
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
    restoreCollectionPoint: async (parent, args) => {
      await db.collectionPoint.restore({
        where: {
          id: args.id,
        },
        individualHooks: true,
      });

      return db.collectionPoint.findByPk(args.id);
    },
    deleteCollectionPoint: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'delete_collection_point')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Collection point not deleted.'
            );
          }
        });
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      return db.collectionPoint.destroy({
        where: {
          id: args.id,
        },
        individualHooks: true,
      });
    },
  },
};

exports.collectionPointResolvers = collectionPointResolvers;

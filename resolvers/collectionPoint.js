"use strict";

const db = require("../models");

const collectionPointResolvers = {
  Query: {
    collectionPoints: () => db.collectionPoint.findAll(),
    collectionPoint: (obj, args, context, info) =>
      db.collectionPoint.findByPk(args.id),
  },

  collectionPoint: {
    eventId: (obj, args, context, info) => db.event.findByPk(obj.eventId),
    createdBy: (obj, args, context, info) => db.user.findByPk(obj.createdBy),
  },

  // CRUD Operations
  Mutation: {
    addCollectionPoint: async (parent, args) => {
      //Checks if eventId is valid
      const event = await db.event.findByPk(args.eventId);

      // Check if createdBy is valid
      const user = await db.user.findByPk(args.createdBy);
      if (!user) {
        throw new Error("Invalid user ID");
      }

      if (!event) {
        throw new Error("Invalid event ID");
      }
      return db.collectionPoint.create({
        name: args.name,
        eventId: args.eventId,
        createdBy: args.createdBy,
      });
    },
    updateCollectionPoint: async (parent, args) => {
      //Checks if eventId is valid
      if (args.eventId) {
        const event = await db.event.findByPk(args.eventId);
        if (!event) {
          throw new Error("Invalid event ID");
        }
      }

      // Checks if createdBy is valid:
      if (args.createdBy) {
        const user = await db.user.findByPk(args.createdBy);
        if (!user) {
          throw new Error("Invalid user ID");
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
          if (rowsAffected[0] == 0) {
            throw new Error("this Collection Point does not exist");
          }
        });
      return db.collectionPoint.findByPk(args.id);
    },
    restoreCollectionPoint: async (parent, args) => {
      await db.collectionPoint.update(
        {
          deletedAt: NULL,
        },
        {
          where: {
            id: args.id,
          },
        }
      );

      return db.collectionPoint.findbyPk(args.id);
    },
    deleteCollectionPoint: (parent, args) => {
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      return db.collectionPoint.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.collectionPointResolvers = collectionPointResolvers;

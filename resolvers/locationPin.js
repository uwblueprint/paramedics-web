"use strict";

const db = require("../models");

const locationPinResolvers = {
  Query: {
    pins: () => db.locationPin.findAll(),
    pin: (obj, args, context, info) => db.locationPin.findByPk(args.id),
  },

  locationPin: {
    eventId: (obj, args, context, info) => db.event.findByPk(obj.eventId),
  },

  // CRUD Operations
  Mutation: {
    addLocationPin: async (parent, args) => {
      //Checks if eventId is valid
      const event = await db.event.findByPk(args.eventId);

      if (!event) {
        throw new Error("Invalid event ID");
      }
      return db.locationPin.create({
        label: args.label,
        eventId: args.eventId,
        latitude: args.latitude,
        longitude: args.longitude,
        address: args.address,
      });
    },
    updateLocationPin: async (parent, args) => {
      //Checks if eventId is valid
      if (args.eventId) {
        const event = await db.event.findByPk(args.eventId);
        if (!event) {
          throw new Error("Invalid event ID");
        }
      }

      await db.collectionPoint
        .update(
          {
            label: args.label,
            eventId: args.eventId,
            latitude: args.latitude,
            longitude: args.longitude,
            address: args.address,
          },
          {
            where: {
              id: args.id,
            },
          }
        )
        .then((rowsAffected) => {
          if (rowsAffected[0] == 0) {
            throw new Error("This location pin does not exist");
          }
        });
      return db.locationPin.findByPk(args.id);
    },
    deleteCollectionPoint: (parent, args) => {
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      return db.locationPin.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.locationPinResolvers = locationPinResolvers;

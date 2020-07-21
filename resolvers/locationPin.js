"use strict";

const db = require("../models");

const locationPinResolvers = {
  Query: {
    pins: () => db.locationPins.findAll(),
    pin: (obj, args, context, info) => db.locationPins.findByPk(args.id),
    pinsForEvent: (obj, args, context, info) =>
      db.locationPins.findAll({
        where: {
          eventId: args.eventId,
        },
      }),
  },

  LocationPin: {
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
      return db.locationPins.create({
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

      await db.locationPins
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
      return db.locationPins.findByPk(args.id);
    },
    restoreLocationPin: async (parent, args) => {
      await db.locationPins.update(
        {
          deletedAt: NULL,
        },
        {
          where: {
            id: args.id,
          },
        }
      );

      return db.locationPins.findbyPk(args.id);
    },
    deleteLocationPin: (parent, args) => {
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      return db.locationPins.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.locationPinResolvers = locationPinResolvers;

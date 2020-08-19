'use strict';

const db = require('../models');

const locationPinResolvers = {
  Query: {
    pins: () => db.locationPins.findAll(),
    pin: (parent, args) => db.locationPins.findByPk(args.id),
    pinsForEvent: (parent, args) =>
      db.locationPins.findAll({
        where: {
          eventId: args.eventId,
        },
      }),
  },

  LocationPin: {
    eventId: (parent) => db.event.findByPk(parent.eventId),
  },

  // CRUD Operations
  Mutation: {
    addLocationPin: async (parent, args) => {
      // Checks if eventId is valid
      await db.event.findByPk(args.eventId).then((event) => {
        if (!event) {
          throw new Error('Invalid event ID: ' + args.eventId);
        }
      });

      return db.locationPins.create({
        label: args.label,
        eventId: args.eventId,
        latitude: args.latitude,
        longitude: args.longitude,
        address: args.address,
      });
    },
    updateLocationPin: async (parent, args) => {
      // Checks if eventId is valid
      if (args.eventId) {
        await db.event.findByPk(args.eventId).then((event) => {
          if (!event) {
            throw new Error('Invalid event ID: ' + args.eventId);
          }
        });
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
          if (rowsAffected[0] === 0) {
            throw new Error('Failed update for location pin ID: ' + args.id);
          }
        });
      return db.locationPins.findByPk(args.id);
    },
    restoreLocationPin: (parent, args) => {
      db.locationPins
        .restore({
          where: {
            id: args.id,
          },
        })
        .then(() => db.locationPins.findByPk(args.id));
    },
    deleteLocationPin: (parent, args) =>
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      db.locationPins.destroy({
        where: {
          id: args.id,
        },
      }),
  },
};

exports.locationPinResolvers = locationPinResolvers;

'use strict';

const db = require('../models');
const validators = require('../utils/validators');

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
      await validators.validateEvent(args.eventId);

      return db.locationPins.create({
        label: args.label,
        eventId: args.eventId,
        latitude: args.latitude,
        longitude: args.longitude,
        address: args.address,
      });
    },
    updateLocationPin: async (parent, args) => {
      if (args.eventId) {
        await validators.validateEvent(args.eventId);
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
    restoreLocationPin: async (parent, args) => {
      await validators.validateLocationPin(args.id, true).catch((error) => {
        throw error;
      });

      await db.locationPins.restore({
        where: {
          id: args.id,
        },
      });
      return db.locationPins.findByPk(args.id);
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

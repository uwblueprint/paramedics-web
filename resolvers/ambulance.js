'use strict';

const db = require('../models');
const { AuthenticationError } = require('apollo-server');

const ambulanceResolvers = {
  Query: {
    ambulances: async (obj, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'read_ambulance')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError('Unauthorized. Ambulance not read.');
          }
        });
      return db.ambulance.findAll({
        include: [
          {
            model: db.event,
          },
        ],
      });
    },
    ambulance: async (obj, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'read_ambulance')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError('Unauthorized. Ambulance not read.');
          }
        });
      return db.ambulance.findByPk(args.id, {
        include: [
          {
            model: db.event,
          },
        ],
      });
    },
  },
  Mutation: {
    addAmbulance: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'add_ambulance')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Ambulance not created.'
            );
          }
        });
      return db.ambulance.create({
        vehicleNumber: args.vehicleNumber,
      });
    },

    updateAmbulance: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'update_ambulance')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Ambulance not updated.'
            );
          }
        });
      await db.ambulance
        .update(
          {
            vehicleNumber: args.vehicleNumber,
          },
          {
            where: {
              id: args.id,
            },
          }
        )
        .then((rowsAffected) => {
          if (rowsAffected[0] === 0) {
            throw new Error('Update for ambulance table failed');
          }
        });

      return db.ambulance.findByPk(args.id);
    },

    restoreAmbulance: async (parent, args) => {
      await db.ambulance.restore({
        where: {
          id: args.id,
        },
      });

      // Restoring event association if event also availiable
      const associatedEvents = await db.eventAmbulances.findAll({
        where: {
          ambulanceId: args.id,
        },
        include: [
          {
            model: db.event,
            required: true,
          },
        ],
        paranoid: false,
      });

      await associatedEvents.map(async (associatedEvent) => {
        db.eventAmbulances.restore({
          where: {
            eventId: associatedEvent.eventId,
            ambulanceId: args.id,
          },
        });
      });

      return db.ambulance.findByPk(args.id);
    },

    deleteAmbulance: async (parent, args, context) => {
      await context.group
        .hasPerm(context.group.id, 'delete_ambulance')
        .then((hasPerm) => {
          if (!hasPerm) {
            throw new AuthenticationError(
              'Unauthorized. Ambulance not deleted.'
            );
          }
        });

      await db.patient
        .count({
          where: {
            ambulanceId: args.id,
          },
        })
        .then((count) => {
          if (count > 0) {
            throw new Error(
              'Deletion failed; there are associated patients for this ambulance'
            );
          }
        });

      await db.eventAmbulances.destroy({
        where: {
          ambulanceId: args.id,
        },
      });

      return db.ambulance.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.ambulanceResolvers = ambulanceResolvers;

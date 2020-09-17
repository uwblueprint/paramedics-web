'use strict';

const db = require('../models');

const ambulanceResolvers = {
  Query: {
    ambulances: () =>
      db.ambulance.findAll({
        include: [
          {
            model: db.event,
          },
        ],
      }),
    ambulance: (parent, args) =>
      db.ambulance.findByPk(args.id, {
        include: [
          {
            model: db.event,
          },
        ],
      }),
  },
  Mutation: {
    addAmbulance: (parent, args) =>
      db.ambulance.create({
        vehicleNumber: args.vehicleNumber,
      }),
    updateAmbulance: (parent, args) =>
      db.ambulance
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
            throw new Error('Failed update for ambulance ID: ' + args.id);
          }
          return db.ambulance.findByPk(args.id);
        }),
    restoreAmbulance: async (parent, args) => {
      return db.ambulance
        .restore({
          where: {
            id: args.id,
          },
        })
        .then(() => db.ambulance.findByPk(args.id));
    },
    deleteAmbulance: async (parent, args) => {
      await Promise.all([
        db.patient
          .count({
            where: {
              ambulanceId: args.id,
            },
          })
          .then((count) => {
            if (count > 0) {
              throw new Error(
                'Deletion failed; there are associated patients for ambulance ID: ' +
                  args.id
              );
            }
          }),
        db.eventAmbulances.destroy({
          where: {
            ambulanceId: args.id,
          },
        }),
      ]);

      return db.ambulance.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.ambulanceResolvers = ambulanceResolvers;

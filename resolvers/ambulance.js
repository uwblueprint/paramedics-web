'use strict';

const db = require('../models');
const validators = require('../utils/validators');

const ambulanceResolvers = {
  Query: {
    ambulances: () => {
      validators.validateRole(['COMMANDER']);
      return db.ambulance.findAll({
        include: [
          {
            model: db.event,
          },
        ],
      });
    },
    ambulance: (parent, args) => {
      validators.validateRole(['COMMANDER']);
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
    addAmbulance: (parent, args) => {
      validators.validateRole(['COMMANDER']);
      return db.ambulance.create({
        vehicleNumber: args.vehicleNumber,
      });
    },
    updateAmbulance: (parent, args) => {
      validators.validateRole(['COMMANDER']);
      db.ambulance
        .update({
          vehicleNumber: args.vehicleNumber,
        })
        .then((rowsAffected) => {
          if (rowsAffected[0] === 0) {
            throw new Error('Failed update for ambulance ID: ' + args.id);
          }
          return db.ambulance.findByPk(args.id);
        });
    },
    restoreAmbulance: async (parent, args) => {
      validators.validateRole(['COMMANDER']);
      await validators.validateAmbulance(args.id, true);
      await db.ambulance.restore({
        where: {
          id: args.id,
        },
      });
      return db.ambulance.findByPk(args.id);
    },
    deleteAmbulance: async (parent, args) => {
      validators.validateRole(['COMMANDER']);
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
        })
        .then(() =>
          db.eventAmbulances.destroy({
            where: {
              id: args.id,
            },
          })
        )
        .then(() =>
          db.ambulance.destroy({
            where: {
              id: args.id,
            },
          })
        )
        .then((isDeleted) => {
          if (isDeleted === 1) {
            return args.id;
          }
          throw new Error('Deletion failed for ambulance ID: ' + args.id);
        });
    },
  },
};
exports.ambulanceResolvers = ambulanceResolvers;

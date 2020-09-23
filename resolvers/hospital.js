'use strict';

const db = require('../models');
const validators = require('../utils/validators');

const hospitalResolvers = {
  Query: {
    hospitals: () =>
      db.hospital.findAll({
        include: [
          {
            model: db.event,
          },
        ],
      }),
    hospital: (parent, args) =>
      db.hospital.findByPk(args.id, {
        include: [
          {
            model: db.event,
          },
        ],
      }),
  },
  Mutation: {
    addHospital: (parent, args) =>
      db.hospital.create({
        name: args.name,
      }),
    updateHospital: (parent, args) =>
      db.hospital
        .update(
          {
            name: args.name,
          },
          {
            where: {
              id: args.id,
            },
          }
        )
        .then((rowsAffected) => {
          if (rowsAffected[0] === 0) {
            throw new Error('Failed update for hospital ID: ' + args.id);
          }
          return db.hospital.findByPk(args.id);
        }),
    restoreHospital: async (parent, args) => {
      await validators.validateHospital(args.id, true);
      await db.hospital.restore({
        where: {
          id: args.id,
        },
      });
      return db.hospital.findByPk(args.id);
    },
    deleteHospital: async (parent, args) => {
      await db.patient
        .count({
          where: {
            hospitalId: args.id,
          },
        })
        .then((count) => {
          if (count > 0) {
            throw new Error(
              'Deletion failed; there are associated patients for hospital ID: ' +
                args.id
            );
          }
        })
        .catch((error) => {
          throw error;
        });
      await db.eventHospitals.destroy({
        where: {
          hospitalId: args.id,
        },
      });

      return db.hospital.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.hospitalResolvers = hospitalResolvers;

'use strict';

const db = require('../models');

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
      await db.hospital
        .findByPk(args.id, { paranoid: false })
        .then((hospital) => {
          if (!hospital) {
            throw new Error('Invalid hospital: ' + args.id);
          }
        });
      return db.hospital
        .restore({
          where: {
            id: args.id,
          },
        })
        .then(() => db.hospital.findByPk(args.id));
    },
    deleteHospital: async (parent, args) => {
      await Promise.all([
        db.patient
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
          }),
        db.eventHospitals.destroy({
          where: {
            hospitalId: args.id,
          },
        }),
      ]);

      return db.hospital.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

exports.hospitalResolvers = hospitalResolvers;

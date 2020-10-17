'use strict';

const db = require('../models');
const { Roles } = require('../utils/enum');
const validators = require('../utils/validators');

const hospitalResolvers = {
  Query: {
    hospitals: () => {
      validators.validateRole(
        Object.keys(Roles),
        validators.demoRole
      );
      return db.hospital.findAll({
        include: [
          {
            model: db.event,
          },
        ],
      });
    },
    hospital: (parent, args) => {
      validators.validateRole(
        Object.keys(Roles),
        validators.demoRole
      );
      return db.hospital.findByPk(args.id, {
        include: [
          {
            model: db.event,
          },
        ],
      });
    },
  },
  Mutation: {
    addHospital: (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.hospital.create({
        name: args.name,
      });
    },
    updateHospital: (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.hospital
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
        });
    },
    restoreHospital: async (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      await validators.validateHospital(args.id, true);
      await db.hospital.restore({
        where: {
          id: args.id,
        },
      });
      return db.hospital.findByPk(args.id);
    },
    deleteHospital: async (parent, args) => {
      validators.validateRole([Roles.COMMANDER], validators.demoRole);
      return db.patient
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
        .then(() =>
          db.eventHospitals.destroy({
            where: {
              hospitalId: args.id,
            },
          })
        )
        .then(() =>
          db.hospital.destroy({
            where: {
              id: args.id,
            },
          })
        )
        .then((isDeleted) => {
          if (isDeleted === 1) {
            return args.id;
          }
          throw new Error('Deletion failed for hospital ID: ' + args.id);
        });
    },
  },
};

exports.hospitalResolvers = hospitalResolvers;

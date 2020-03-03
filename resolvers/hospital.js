"use strict";

const db = require("../models");

const hospitalResolvers = {
  Query: {
    hospitals: () => db.hospital.findAll(),
    hospital(obj, args, context, info) {
      return db.hospital.findByPk(args.id);
    },
  },
  Mutation: {
    addHospital: (parent, args) => {
        const hospital = db.hospital.create({
            name: args.name
        });
        return hospital;
    },
    updateHospital: (parent, args) => {
        db.hospital.update({
          name: args.name,
        },
        {
          where: {
            id: args.id
          }
        });

        return db.hospital.findByPk(args.id);
    },
    deleteHospital: (parent, args) => {
      db.hospital.destroy({
        where: {
          id: args.id
        }
      })
    }
  }
};

exports.hospitalResolvers = hospitalResolvers;

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
        const hospital = db.hospital.update({
          name: args.name,
        },
        {
          where: {
            id: args.id
          }
        });
    }
  },
};

exports.hospitalResolvers = hospitalResolvers;

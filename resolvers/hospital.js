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
        return db.hospital.create({
            name: args.name
        });
    },
    updateHospital: async (parent, args) => {
        await db.hospital.update({ // Handle case when id does not exist
          name: args.name,
        },
        {
          where: {
            id: args.id
          }
        }).then(rowsAffected => {
          
        });
        return db.hospital.findByPk(args.id);
    },
    deleteHospital: (parent, args) => {
      return db.hospital.destroy({
        where: {
          id: args.id
        }
      })
    }
  }
};

exports.hospitalResolvers = hospitalResolvers;

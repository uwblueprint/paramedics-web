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
        db.hospital.update({ // Handle case when id does not exist
          name: args.name,
        },
        {
          where: {
            id: args.id
          }
        }).then(arg1 => {
          console.log("then");
          console.log(arg1);
        }).catch( errorStatus => {
          console.log("then");
          console.log(errorStatus);
        });

        return db.hospital.findByPk(args.id);
    },
    deleteHospital: async (parent, args) => {
      const destroyedStatus = await db.hospital.destroy({
        where: {
          id: args.id
        }
      })

      return destroyedStatus
    }
  }
};

exports.hospitalResolvers = hospitalResolvers;

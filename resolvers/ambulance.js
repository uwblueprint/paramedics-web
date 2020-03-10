"use strict";

const db = require("../models");

const ambulanceResolvers = {
  Query: {
    ambulances: () => db.ambulance.findAll(),
    ambulance: (obj, args, context, info) => db.ambulance.findByPk(args.id)
  },
  Mutation: {
    addAmbulance: (parent, args) => {
        const ambulance = db.ambulance.create({
            vehicleNumber: args.vehicleNumber
        });
        return ambulance;
    },

    updateAmbulance: async (parent, args) => {
      await db.ambulance.update({ 
        vehicleNumber: args.vehicleNumber,
      },
      {
        where: {
          id: args.id
        }
      }).then(rowsAffected => {
        if (rowsAffected[0] === 0) {
          throw new Error("Update for ambulance table failed");
        }
      });

      return db.ambulance.findByPk(args.id);
    },

    deleteAmbulance: (parent, args) => {
      return db.ambulance.destroy({
        where: {
          id: args.id
        }
      })
    }
},
};

exports.ambulanceResolvers = ambulanceResolvers;

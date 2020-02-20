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

    updateAmbulance: (parent, args) => {
        const ambulance = db.ambulance.update( {
            vehicleNumber: args.vehicleNumber
          },
          { where: {
            id: args.id
            }
          }
        );
    },

    deleteAmbulance: (parent, args) => {
      db.ambulance.destroy({
        where: {
          id: args.id
        }
      })
    }
},
};

exports.ambulanceResolvers = ambulanceResolvers;

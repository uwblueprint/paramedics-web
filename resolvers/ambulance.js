"use strict";

const db = require("../models");
const { AuthenticationError } = require('apollo-server');

const ambulanceResolvers = {
  Query: {
    ambulances: async (obj, args, context) => {
      let hasPerm = await context.group.hasPerm(context.group.id, "read_ambulance");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Ambulance not read.");
      }
      return db.ambulance.findAll();
    },
    ambulance: async (obj, args, context, info) => {
      let hasPerm = await context.group.hasPerm(context.group.id, "read_ambulance");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Ambulance not read.");
      }
      return db.ambulance.findByPk(args.id);
    }
  },
  Mutation: {
    addAmbulance: async (parent, args, context) => {
      let hasPerm = await context.group.hasPerm(context.group.id, "add_ambulance");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Ambulance not created.");
      }
        return db.ambulance.create({
            vehicleNumber: args.vehicleNumber
        });
    },

    updateAmbulance: async (parent, args, context) => {
      let hasPerm = await context.group.hasPerm(context.group.id, "update_ambulance");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Ambulance not updated.");
      }
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

    deleteAmbulance: async (parent, args, context) => {
      let hasPerm = await context.group.hasPerm(context.group.id, "delete_ambulance");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Ambulance not deleted.");
      }
      return db.ambulance.destroy({
        where: {
          id: args.id
        }
      })
    }
},
};

exports.ambulanceResolvers = ambulanceResolvers;

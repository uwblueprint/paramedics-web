"use strict";

const db = require("../models");
const { AuthenticationError } = require('apollo-server');

const hospitalResolvers = {
  Query: {
    hospitals: async (obj, args, context) => {


    let hasPerm = await context.group.hasPerm(context.group.id, "read_hospital");

    if (!hasPerm) {
      throw new AuthenticationError("Unauthorized. Hospital not read.");
    }
    return db.event.findAll() },
    hospital(obj, args, context, info) {
      return db.hospital.findByPk(args.id);
    },
  },
  Mutation: {
    addHospital: async (parent, args, context) => {

      let hasPerm = await context.group.hasPerm(context.group.id,"create_hospital");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Hospital not created.");
      }
       return db.hospital.create({
            name: args.name
        });
    },
<<<<<<< HEAD
    updateHospital: async (parent, args, context) => {

      let hasPerm = await context.group.hasPerm(context.group.id, "update_hospital");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Hospital not updated.");
      }
        await db.hospital.update({ // Handle case when id does not exist
=======
    updateHospital: async (parent, args) => {
        await db.hospital.update({ 
>>>>>>> 6b6df1bd21b8b52403108818e02550d33562cc9a
          name: args.name,
        },
        {
          where: {
            id: args.id
          }
        }).then(rowsAffected => {
          if (rowsAffected[0] === 0) {
            throw new Error("Update failed for hospital table");
          }
        });
        return db.hospital.findByPk(args.id);
    },
<<<<<<< HEAD
    deleteHospital: async (parent, args, context) => {

      let hasPerm = await context.group.hasPerm(context.group.id, "delete_hospital");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Hospital not deleted.");
      }
      
      return db.hospital.destroy({
=======
    deleteHospital: (parent, args) => {
      return db.hospital.destroy({ 
>>>>>>> 6b6df1bd21b8b52403108818e02550d33562cc9a
        where: {
          id: args.id
        }
      })
    }
  }
};

exports.hospitalResolvers = hospitalResolvers;

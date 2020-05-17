"use strict";

const db = require("../models");
const { AuthenticationError } = require('apollo-server');

const eventResolvers = {
  Query: {
    events: async (obj, args, context) => {
      let hasPerm = await context.group.hasPerm(context.group.id, "read_event");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Event not read.");
      }
      return db.event.findAll();
    },
    event: (obj, args, context, info) => db.event.findByPk(args.id)
  },
  Event: {
    createdBy: (obj, args, context, info) => db.user.findByPk(obj.createdBy)
  },
  Mutation: {
    addEvent: async (parent, args, context) => {
      // Check if createdBy is valid

      let hasPerm = await context.group.hasPerm(context.group.id, "add_event");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Event not created.");
      }
      const user = await db.user.findByPk(args.createdBy);
      if (!user) {
        throw new Error("Invalid user ID");
      }
      return db.event.create({
        name: args.name,
        eventDate: args.eventDate,
        createdBy: args.createdBy,
        isActive: args.isActive
      });
    },
    updateEvent: async (parent, args, context) => {

      let hasPerm = await context.group.hasPerm(context.group.id, "update_event");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Event not updated.");
      }
      const event = await db.event.findByPk(args.id);
      if (args.createdBy) {
        const user = await db.user.findByPk(args.createdBy);
        if (!user) {
          throw new Error("Invalid user ID");
        }
      }
      if (!event) {
        throw new Error("Invalid event ID");
      }

      await db.event.update(  
        {
          name: args.name,
          eventDate: args.eventDate,
          createdBy: args.createdBy,
          isActive: args.isActive
        },
        {
          where: { id: args.id }
        }
      );
      return db.event.findByPk(args.id);
    },

    deleteEvent: (parent, args, context) => {
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      let hasPerm = context.group.hasPerm(context.group.id, "delete_event");
      if (!hasPerm) {
        throw new AuthenticationError("Unauthorized. Event not deleted.");
      
      }
      return db.event.destroy({
        where: {
          id: args.id
        }
      });
    }
  }
};

exports.eventResolvers = eventResolvers;

"use strict";

const db = require("../models");

const eventResolvers = {
  Query: {
    events: () => db.event.findAll(),
    event: (obj, args, context, info) => db.event.findByPk(args.id)
  },
  Event: {
    createdBy: (obj, args, context, info) => db.user.findByPk(obj.createdBy)
  },
  Mutation: {
    addEvent: async (parent, args) => {
      // Check if createdBy is valid
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
    updateEvent: async (parent, args) => {
      const event = await db.event.findByPk(args.id);
      const user = args.createdBy
        ? await db.user.findByPk(args.createdBy)
        : true;
      if (!event) {
        throw new Error("Invalid event ID");
      } else if (!user) {
        throw new Error("Invalid user ID");
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
    deleteEvent: (parent, args) => {
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      return db.event.destroy({
        where: {
          id: args.id
        }
      });
    }
  }
};

exports.eventResolvers = eventResolvers;

"use strict";

const db = require("../models");

const eventResolvers = {
  Query: {
    events: () => db.event.findAll({ 
        include: [{
          model: db.ambulance,
          attributes: ['id', 'vehicleNumber', 'createdAt', 'updatedAt'],
        },
        {
          model: db.hospital,
          attributes: ['id', 'name', 'createdAt', 'updatedAt']
        }]
      },
    ),
    event: (obj, args, context, info) => db.event.findByPk(args.id, { 
      include: [{
        model: db.ambulance,
        attributes: ['id', 'vehicleNumber', 'createdAt', 'updatedAt'],
      },
      {
        model: db.hospital,
        attributes: ['id', 'name', 'createdAt', 'updatedAt']
      }]
    })
  },
  Event: {
    createdBy: (obj, args, context, info) => db.user.findByPk(obj.createdBy),
    // ambulances: (obj, args, context, info) => db.ambulance.findByPk(obj.ambulances),
    // hospitals: (obj, args, context, info) => db.hospital.findByPk(obj.hospitals),
  },
  Mutation: {
    addEvent: async (parent, args) => {
      // Check if createdBy is valid
      const user = await db.user.findByPk(args.createdBy);
      if (!user) {
        throw new Error("Invalid user ID");
      }
      
      const hasError = false;
      // Checking if ambulances are valid
      args.ambulances.forEach(async ambulanceId => {
        const ambulance = await db.ambulances.findByPk(ambulanceId);
        if (!ambulance) {
          hasError = true;
          return;
        }
      });
      if (hasError) {
        throw new Error("Invalid vehicle ID");
      }

      hasError = false
      // Checking if hospitals are valid
      args.hospitals.forEach(async hospitalId => {
        const hospital = await db.hospitals.findByPk(hospitalId);
        if (!hospital) {
          hasError = true;
          return;
        }
      });
      if (hasError) {
        throw new Error("Invalid hospital ID");
      }

      return db.event.create({
        name: args.name,
        eventDate: args.eventDate,
        createdBy: args.createdBy,
        isActive: args.isActive,
        ambulances: args.ambulances,
        hospitals: args.hospitals
      });
    },
    updateEvent: async (parent, args) => {
      const event = await db.event.findByPk(args.id);
      if (!event) {
        throw new Error("Invalid event ID");
      }
      
      if (args.createdBy) {
        const user = await db.user.findByPk(args.createdBy);
        if (!user) {
          throw new Error("Invalid user ID");
        }
      }

      if (args.ambulances) {
        const hasError = false;
        // Checking if ambulances are valid
        args.ambulances.forEach(async ambulanceId => {
          const ambulance = await db.ambulances.findByPk(ambulanceId);
          if (!ambulance) {
            hasError = true;
            return;
          }
        });
  
        if (hasError) {
          throw new Error("Invalid vehicle ID");
        }
      }

      if (args.hospitals) {
        const hasError = false;
        // Checking if hospitals are valid
        args.hospitals.forEach(async hospitalId=> {
          const hospital = await db.hospitals.findByPk(hospitalId);
          if (!hospital) {
            hasError = true;
            return;
          }
        });

        if (hasError) {
          throw new Error("Invalid hospital ID");
        }
      }

      await db.event.update(
        {
          name: args.name,
          eventDate: args.eventDate,
          createdBy: args.createdBy,
          isActive: args.isActive,
          ambulances: args.ambulances,
          hospitals: args.hospitals
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

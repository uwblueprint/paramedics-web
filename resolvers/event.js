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

      await db.event.create({
        name: args.name,
        eventDate: args.eventDate,
        createdBy: args.createdBy,
        isActive: args.isActive
      })

      return {
        name: args.name,
        eventDate: args.eventDate,
        createdBy: args.createdBy,
        isActive: args.isActive,
        ambulances: [],
        hospitals: [],
      };
    },
    updateEvent: async (parent, args) => {
      // Checking if event is valid
      const event = await db.event.findByPk(args.id);
      if (!event) {
        throw new Error("Invalid event ID");
      }
      
      // Checking if user is valid
      if (args.createdBy) {
        const user = await db.user.findByPk(args.createdBy);
        if (!user) {
          throw new Error("Invalid user ID");
        }
      }

      const hasError = false;

      const addAmbulances = async () => {
        // Checking if ambulances are valid
        for (const ambulanceId of args.ambulances ) {
          const ambulance = await db.ambulance.findByPk(ambulanceId);
          if (!ambulance) {
            hasError = true;
            return;
          }
        }

        // Removing all instances of this particular event in the junction table
        await db.eventAmbulances.destroy({
          where: {
            eventId: args.id
          }
        });
        
        // Adding in all relations of the given event and the given ambulances
        for (const ambulanceId of args.ambulances ) {
          await db.eventAmbulances.create({
            eventId: args.id,
            ambulanceId: ambulanceId
          })
        }
      };
      
      // Calling async function to actually conduct association operations
      if (args.ambulances) {
        addAmbulances();
  
        if (hasError) {
          throw new Error("Invalid vehicle ID");
        }
      }
      
      const addHospitals = async () => {
        // Checking if hospitals are valid
        for (const hospitalId of args.hospitals ) {
          const hospital = await db.hospital.findByPk(hospitalId);
          if (!hospital) {
            hasError = true;
            return;
          }
        }
        
        // Removing all records of event in eventHospital junction table
        await db.eventHospitals.destroy({
          where: {
            eventId: args.id
          }
        });
        
        // Adding in records of a singular association with the event and the hospital
        for (const hospitalId of args.hospitals) {
          await db.eventHospitals.create({
            eventId: args.id,
            ambulanceId: hospitalId
          })
        }
      }

      if (args.hospitals) {
        // Checking if hospitals are valid
        addHospitals();
        
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
        },
        {
          where: { id: args.id }
        }
      );
      return db.event.findByPk(args.id, { 
        include: [{
          model: db.ambulance,
          attributes: ['id', 'vehicleNumber', 'createdAt', 'updatedAt'],
        },
        {
          model: db.hospital,
          attributes: ['id', 'name', 'createdAt', 'updatedAt']
        }]
      });
    },
    addAmbulanceToEvent: async (parent, args) => {
      // Checking if event exists
      const event = await db.event.findByPk(args.id);
      if (!event) {
        throw new Error("Invalid event ID");
      }

      // Checking if ambulance exists
      const ambulance = await db.ambulances.findByPk(args.createdBy);
      if (!ambulance) {
        throw new Error("Invalid ambulance ID");
      }
      
      // Checking if association between ambulance and event already exists
      const alreadyExists = await db.eventAmbulances.findAll({
        where: {
          eventId: args.id,
          hospitalId: args.ambulanceId
        }
      })

      if (alreadyExists) {
        throw new Error("This ambulance is already assigned to this event")
      }

      // Creating association in eventAmbulances junction table
      await db.eventAmbulances.create({
        eventId: args.id,
        ambulanceId: args.ambulanceId
      })

      // Returning new event
      return db.event.findByPk(args.id, { 
        include: [{
          model: db.ambulance,
          attributes: ['id', 'vehicleNumber', 'createdAt', 'updatedAt'],
        },
        {
          model: db.hospital,
          attributes: ['id', 'name', 'createdAt', 'updatedAt']
        }]
      });
    },
    addHospitalToEvent: async (parent, args) => {
      // Checking if event exists
      const event = await db.event.findByPk(args.id);
      if (!event) {
        throw new Error("Invalid event ID");
      }
      
      // Checking if hospital exists
      const hospital = await db.hospital.findByPk(hospitalId);
      if (!event) {
        throw new Error("Invalid hospital ID");
      }

      // Checking if association between hospital and event already exists
      const alreadyExists = await db.eventHospitals.findAll({
        where: {
          eventId: args.id,
          hospitalId: args.hospitalId
        }
      })
      if (alreadyExists) {
        throw new Error("This hospital is already assigned to this event")
      }

      // Creating association in eventHospitals junction table
      await db.eventHospitals.create({
        eventId: args.id,
        ambulanceId: hospitalId
      })

      // Returning new event
      return db.event.findByPk(args.id, { 
        include: [{
          model: db.ambulance,
          attributes: ['id', 'vehicleNumber', 'createdAt', 'updatedAt'],
        },
        {
          model: db.hospital,
          attributes: ['id', 'name', 'createdAt', 'updatedAt']
        }]
      });   
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

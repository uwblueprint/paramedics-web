"use strict";

const db = require("../models");

const eventResolvers = {
  Query: {
    events: () =>
      db.event.findAll({
        include: [
          {
            model: db.ambulance,
            attributes: ["id", "vehicleNumber", "createdAt", "updatedAt"],
          },
          {
            model: db.hospital,
            attributes: ["id", "name", "createdAt", "updatedAt"],
          },
        ],
      }),
    event: (obj, args, context, info) =>
      db.event.findByPk(args.id, {
        include: [
          {
            model: db.ambulance,
            attributes: ["id", "vehicleNumber", "createdAt", "updatedAt"],
          },
          {
            model: db.hospital,
            attributes: ["id", "name", "createdAt", "updatedAt"],
          },
        ],
      }),
    archivedEvents: () =>
      db.event.findAll({
        where: {
          isActive: false,
        },
      }),
  },
  Event: {
    createdBy: (obj, args, context, info) => db.user.findByPk(obj.createdBy),
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
        isActive: args.isActive,
      });

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

      const addAmbulances = async () => {
        // Checking if ambulances are valid
        for (const ambulanceId of args.ambulances) {
          const ambulance = await db.ambulance.findByPk(ambulanceId["id"]);
          if (!ambulance) {
            return true;
          }
        }
        // Removing all instances of this particular event in the junction table
        await db.eventAmbulances.destroy({
          where: {
            eventId: args.id,
          },
        });

        // Adding in all relations of the given event and the given ambulances
        for (const ambulanceId of args.ambulances) {
          await db.eventAmbulances.create({
            eventId: args.id,
            ambulanceId: ambulanceId["id"],
          });
        }

        return false;
      };

      // Calling async function to actually conduct association operations
      if (args.ambulances) {
        const ambulanceHasError = await addAmbulances();
        if (ambulanceHasError) {
          throw new Error("Invalid ambulance ID");
        }
      }

      const addHospitals = async () => {
        // Checking if hospitals are valid
        for (const hospitalId of args.hospitals) {
          const hospital = await db.hospital.findByPk(hospitalId["id"]);
          if (!hospital) {
            return true;
          }
        }

        // Removing all records of event in eventHospital junction table
        await db.eventHospitals.destroy({
          where: {
            eventId: args.id,
          },
        });

        // Adding in records of a singular association with the event and the hospital
        for (const hospitalId of args.hospitals) {
          await db.eventHospitals.create({
            eventId: args.id,
            hospitalId: hospitalId["id"],
          });
        }

        return false;
      };

      if (args.hospitals) {
        // Checking if hospitals are valid
        const hospitalHasError = await addHospitals();
        if (hospitalHasError) {
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
          where: { id: args.id },
        }
      );
      return db.event.findByPk(args.id, {
        include: [
          {
            model: db.ambulance,
            attributes: ["id", "vehicleNumber", "createdAt", "updatedAt"],
          },
          {
            model: db.hospital,
            attributes: ["id", "name", "createdAt", "updatedAt"],
          },
        ],
      });
    },
    addAmbulanceToEvent: async (parent, args) => {
      // Checking if event exists
      const event = await db.event.findByPk(args.eventId);
      if (!event) {
        throw new Error("Invalid event ID");
      }

      // Checking if ambulance exists
      const ambulance = await db.ambulance.findByPk(args.ambulanceId["id"]);
      if (!ambulance) {
        throw new Error("Invalid ambulance ID");
      }

      // Checking if association between ambulance and event already exists
      const alreadyExistsNotDeleted = await db.eventAmbulances.count({
        where: {
          eventId: args.eventId,
          ambulanceId: args.ambulanceId["id"],
        },
      });
      if (alreadyExistsNotDeleted > 0) {
        throw new Error("This ambulance is already assigned to this event");
      }

      const alreadyExistsDeleted = await db.eventAmbulances.count({
        where: {
          eventId: args.eventId,
          hospitalId: args.hospitalId["id"],
        },
        paranoid: false,
      });

      if (alreadyExistsDeleted > 0) {
        await db.eventAmbulances.restore({
          where: {
            eventId: args.eventId,
            hospitalId: args.ambulanceId["id"],
          },
        });
      } else {
        // Creating association in eventHospitals junction table if not already created
        await db.eventAmbulances.create({
          eventId: args.eventId,
          hospitalId: args.ambulanceId["id"],
        });
      }

      // Returning new event
      return db.event.findByPk(args.eventId, {
        include: [
          {
            model: db.ambulance,
            attributes: ["id", "vehicleNumber", "createdAt", "updatedAt"],
          },
          {
            model: db.hospital,
            attributes: ["id", "name", "createdAt", "updatedAt"],
          },
        ],
      });
    },
    addHospitalToEvent: async (parent, args) => {
      // Checking if event exists
      const event = await db.event.findByPk(args.eventId);
      if (!event) {
        throw new Error("Invalid event ID");
      }

      // Checking if hospital exists
      const hospital = await db.hospital.findByPk(args.hospitalId["id"]);
      if (!hospital) {
        throw new Error("Invalid hospital ID");
      }

      // Checking if association between hospital and event already exists and not deleted
      const alreadyExistsNotDeleted = await db.eventHospitals.count({
        where: {
          eventId: args.eventId,
          hospitalId: args.hospitalId["id"],
        },
      });
      if (alreadyExistsNotDeleted > 0) {
        throw new Error("This hospital is already assigned to this event");
      }

      // Restoring association if previously deleted
      const alreadyExistsDeleted = await db.eventHospitals.count({
        where: {
          eventId: args.eventId,
          hospitalId: args.hospitalId["id"],
        },
        paranoid: false,
      });

      if (alreadyExistsDeleted > 0) {
        await db.eventHospitals.restore({
          where: {
            eventId: args.eventId,
            hospitalId: args.hospitalId["id"],
          },
        });
      } else {
        // Creating association in eventHospitals junction table if not already created
        await db.eventHospitals.create({
          eventId: args.eventId,
          hospitalId: args.hospitalId["id"],
        });
      }

      // Returning new event
      return db.event.findByPk(args.eventId, {
        include: [
          {
            model: db.ambulance,
            attributes: ["id", "vehicleNumber", "createdAt", "updatedAt"],
          },
          {
            model: db.hospital,
            attributes: ["id", "name", "createdAt", "updatedAt"],
          },
        ],
      });
    },
    restoreEvent: async (parent, args) => {
      await db.event.restore({
        where: {
          id: args.id,
        },
        individualHooks: true,
      });

      // Checking if corresponding ambulances are also restored and restoring associations if true
      const associatedAmbulances = await db.eventAmbulances.findAll({
        where: {
          eventId: args.id,
        },
        include: [
          {
            model: db.ambulance,
            required: true,
          },
        ],
        paranoid: false,
      });

      await associatedAmbulances.map(async (associatedAmbulance) => {
        db.eventAmbulances.restore({
          where: {
            eventId: args.id,
            ambulanceId: associatedAmbulance.ambulanceId,
          },
        });
      });

      // Restoring event-hospital relation if corresponding hospital also restored
      const associatedHospitals = await db.eventHospitals.findAll({
        where: {
          eventId: args.id,
        },
        include: [
          {
            model: db.hospital,
            required: true,
          },
        ],
        paranoid: false,
      });

      await associatedHospitals.map(async (associatedHospital) => {
        db.eventHospitals.restore({
          where: {
            eventId: args.id,
            hospitalId: associatedHospital.hospitalId,
          },
        });
      });

      return db.event.findByPk(args.id);
    },
    deleteEvent: async (parent, args) => {
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      await db.eventAmbulances.destroy({
        where: {
          eventId: args.id,
        },
      });

      await db.eventHospitals.destroy({
        where: {
          eventId: args.id,
        },
      });

      return db.event.destroy({
        where: {
          id: args.id,
        },
        individualHooks: true,
      });
    },
  },
};

exports.eventResolvers = eventResolvers;

'use strict';

const db = require('../models');
const validators = require('../utils/validators');

const eventResolvers = {
  Query: {
    events: () =>
      db.event.findAll({
        include: [
          {
            model: db.ambulance,
          },
          {
            model: db.hospital,
          },
        ],
      }),
    event: (parent, args) =>
      db.event.findByPk(args.id, {
        include: [
          {
            model: db.ambulance,
          },
          {
            model: db.hospital,
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
    createdBy: (parent) => db.user.findByPk(parent.createdBy),
  },
  Mutation: {
    addEvent: async (parent, args) => {
      await validators.validateUser(args.createdBy);

      return db.event
        .create({
          name: args.name,
          eventDate: args.eventDate,
          createdBy: args.createdBy,
          isActive: args.isActive,
        })
        .then((newEvent) => ({
          id: newEvent.id,
          name: newEvent.name,
          eventDate: newEvent.eventDate,
          createdBy: newEvent.createdBy,
          isActive: newEvent.isActive,
          ambulances: [],
          hospitals: [],
        }));
    },
    updateEvent: async (parent, args) => {
      await validators.validateEvent(args.id);
      if (args.createdBy) {
        await validators.validateUser(args.createdBy);
      }
      if (args.ambulances) {
        // Checking if all ambulances exist
        await Promise.all(
          args.ambulances.map((ambulance) =>
            validators.validateAmbulance(ambulance.id)
          )
        );

        // Removing all instances of this particular event in the junction table
        await db.eventAmbulances.destroy({
          where: {
            eventId: args.id,
          },
        });

        // Adding in all relations of the given event and the given ambulances
        await Promise.all(
          args.ambulances.map((ambulanceId) =>
            db.eventAmbulances.create({
              eventId: args.id,
              ambulanceId: ambulanceId.id,
            })
          )
        );
      }

      if (args.hospitals) {
        // Checking if all hospitals exist
        await Promise.all(
          args.hospitals.map((hospital) =>
            validators.validateHospital(hospital.id)
          )
        );

        // Removing all instances of this particular event in the junction table
        await db.eventHospitals.destroy({
          where: {
            eventId: args.id,
          },
        });

        // Adding in all relations of the given event and the given hospitals
        await Promise.all(
          args.hospitals.map((hospitalId) =>
            db.eventHospitals.create({
              eventId: args.id,
              hospitalId: hospitalId.id,
            })
          )
        );
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
            attributes: ['id', 'vehicleNumber', 'createdAt', 'updatedAt'],
          },
          {
            model: db.hospital,
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
          },
        ],
      });
    },
    addAmbulancesToEvent: async (parent, args) => {
      await validators.validateEvent(args.eventId);

      // Checking if all ambulances exist
      await Promise.all(
        args.ambulances.map((ambulance) =>
          validators.validateAmbulance(ambulance.id)
        )
      );

      await Promise.all(
        args.ambulances.map(async (ambulanceId) =>
          db.eventAmbulances
            .findAll({
              where: {
                eventId: args.eventId,
                ambulanceId: ambulanceId.id,
              },
            })
            .then(async (eventAmbulanceAssociations) => {
              if (eventAmbulanceAssociations.length === 0) {
                await db.eventAmbulances.create({
                  eventId: args.eventId,
                  ambulanceId: ambulanceId.id,
                });
              }
            })
        )
      );

      // Returning new event
      return db.event.findByPk(args.eventId, {
        include: [
          {
            model: db.ambulance,
          },
          {
            model: db.hospital,
          },
        ],
      });
    },

    addHospitalsToEvent: async (parent, args) => {
      await validators.validateEvent(args.eventId);

      // Checking if all hospitals exist
      await Promise.all(
        args.hospitals.map((hospital) =>
          validators.validateHospital(hospital.id)
        )
      );

      await Promise.all(
        args.hospitals.map(async (hospitalId) =>
          db.eventHospitals
            .findAll({
              where: {
                eventId: args.eventId,
                hospitalId: hospitalId.id,
              },
            })
            .then(async (eventHospitalAssociations) => {
              if (eventHospitalAssociations.length === 0) {
                await db.eventHospitals.create({
                  eventId: args.eventId,
                  hospitalId: hospitalId.id,
                });
              }
            })
        )
      );

      // Returning updated event
      return db.event.findByPk(args.eventId, {
        include: [
          {
            model: db.ambulance,
          },
          {
            model: db.hospital,
          },
        ],
      });
    },

    deleteAmbulancesFromEvent: async (parent, args) => {
      await validators.validateEvent(args.eventId);

      // Checking if all ambulances exist
      await Promise.all(
        args.ambulances.map((ambulance) =>
          validators.validateAmbulance(ambulance.id)
        )
      );

      // Removing association in eventAmbulance junction table
      await Promise.all(
        args.ambulances.map((ambulanceId) =>
          db.eventAmbulances.destroy({
            where: {
              eventId: args.eventId,
              ambulanceId: ambulanceId.id,
            },
          })
        )
      );

      // Returning updated event
      return db.event.findByPk(args.eventId, {
        include: [
          {
            model: db.ambulance,
          },
          {
            model: db.hospital,
          },
        ],
      });
    },

    deleteHospitalsFromEvent: async (parent, args) => {
      await validators.validateEvent(args.eventId);

      // Checking if all hospitals exist
      await Promise.all(
        args.hospitals.map((hospital) =>
          validators.validateHospital(hospital.id)
        )
      );

      // Removing association in eventHospitals junction table
      await Promise.all(
        args.hospitals.map((hospitalId) =>
          db.eventHospitals.destroy({
            where: {
              eventId: args.eventId,
              hospitalId: hospitalId.id,
            },
          })
        )
      );

      // Returning updated event
      return db.event.findByPk(args.eventId, {
        include: [
          {
            model: db.ambulance,
          },
          {
            model: db.hospital,
          },
        ],
      });
    },

    deleteEvent: async (parent, args) => {
      // Return status for destroy
      // 1 for successful deletion, 0 otherwise
      await Promise.all([
        db.eventAmbulances.destroy({
          where: {
            eventId: args.id,
          },
        }),
        db.eventHospitals.destroy({
          where: {
            eventId: args.id,
          },
        }),
      ]);

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

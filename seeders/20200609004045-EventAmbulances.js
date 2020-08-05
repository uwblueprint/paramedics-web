'use strict';

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await db.user.create({
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      accessLevel: "SUPERVISOR",
      password: "asdfgh1234",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const event1 = await db.event.create({
      eventDate: new Date(),
      name: "Big Bad Event #1",
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const event2 = await db.event.create({
      eventDate: new Date(),
      name: "Big Bad Event #2",
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const ambulance1 = await db.ambulance.create({
      vehicleNumber: 890,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const ambulance2 = await db.ambulance.create({
      vehicleNumber: 891,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('eventAmbulances', [{
      eventId: event1.id,
      ambulanceId: ambulance1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: event1.id,
      ambulanceId: ambulance2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: event2.id,
      ambulanceId: ambulance1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: event2.id,
      ambulanceId: ambulance2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('eventAmbulances', null, {});
  }
};

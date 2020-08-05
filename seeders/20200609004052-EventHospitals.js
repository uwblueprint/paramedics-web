'use strict';

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await db.user.create({
      name: "Jill Doe",
      email: "jilldoe@gmail.com",
      accessLevel: "COMMANDER",
      password: "asdfgh1234",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const event1 = await db.event.create({
      eventDate: new Date(),
      name: "Big Bad Event #3",
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const event2 = await db.event.create({
      eventDate: new Date(),
      name: "Big Bad Event #4",
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const hospital1 = await db.hospital.create({
      name: "Waterloo's Best Hospital 1",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const hospital2 = await db.hospital.create({
      name: "Waterloo's Best Hospital 2",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('eventHospitals', [{
      eventId: event1.id,
      hospitalId: hospital1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: event1.id,
      hospitalId: hospital2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: event2.id,
      hospitalId: hospital1.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: event2.id,
      hospitalId: hospital2.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('eventHospitals', null, {});
  }
};

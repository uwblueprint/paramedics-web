"use strict";

const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await db.user.create({
      firstName: "Capt",
      lastName: "Holt",
      email: "capt.holt@asd.com",
      password: "asdfgh1234",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // const ambulance1 = await db.ambulance.create({
    //   vehicleNumber: 1,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })

    // const ambulance2 = await db.ambulance.create({
    //   vehicleNumber: 2,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })

    // const hospital1 = await db.hospital.create({
    //   name: "Hospital 1",
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })

    // const hospital2 = await db.hospital.create({
    //   name: "Hospital 2",
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })

    return queryInterface.bulkInsert("events", [
      {
        name: "St Patrick's Day",
        eventDate: new Date(),
        createdBy: user.id,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        // ambulances: [ambulance1.id, ambulance2.id],
        // hospitals: [hospital1.id, hospital2.id],
      },
      {
        name: "Homecoming",
        eventDate: new Date(),
        createdBy: user.id,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        // ambulances: [ambulance1.id, ambulance2.id],
        // hospitals: [hospital1.id, hospital2.id],
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("events", null, {});
  }
};

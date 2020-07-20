"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("locationPins", [
      {
        latitude: 65.679012,
        longitude: -60.68729,
        label: "Pin 1",
        address: "Test Address 1",
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: 10.2392,
        longitude: 76.989,
        label: "Pin 2",
        address: "Test Address 2",
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: 60.891,
        longitude: 60.891,
        label: "Pin 3",
        address: "Test Address 3",
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("locationPins", null, {});
  },
};

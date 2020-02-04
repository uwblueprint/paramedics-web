"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("events", [
      {
        name: "St Patrick's Day",
        date: new Date(),
        createdBy: 0,
        isActive: true,
        description: "bunch of drunk students",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Homecoming",
        date: new Date(),
        createdBy: 1,
        isActive: true,
        description: "a lot of drunk students",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("events", null, {});
  }
};

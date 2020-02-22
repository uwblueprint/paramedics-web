"use strict";

const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await db.user.create(
        {
          firstName: 'Capt',
          lastName: 'Holt',
          email: 'capt.holt@asd.com',
          password:'asdfgh1234',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    );

    return queryInterface.bulkInsert("events", [
      {
        name: "St Patrick's Day",
        date: new Date(),
        createdBy: user.id,
        isActive: true,
        description: "bunch of drunk students",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Homecoming",
        date: new Date(),
        createdBy: user.id,
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

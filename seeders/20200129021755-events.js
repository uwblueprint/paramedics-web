'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const user = await db.user.create({
      name: 'Capt Holt',
      email: 'capt.holt@asd.com',
      accessLevel: 'COMMANDER',
      password: 'asdfgh1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('events', [
      {
        name: "St Patrick's Day",
        eventDate: new Date(),
        createdBy: user.id,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Homecoming',
        eventDate: new Date(),
        createdBy: user.id,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('events', null, {});
  },
};

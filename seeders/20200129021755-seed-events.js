'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const user = await db.user.create({
      name: 'Admin Holt',
      email: 'capt.holt@asd.com',
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('events', [
      {
        name: 'Fire @ Precinct 99',
        eventDate: new Date(),
        createdBy: user.id,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Halloween Heist',
        eventDate: new Date(),
        createdBy: user.id,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('events', null, {});
  },
};

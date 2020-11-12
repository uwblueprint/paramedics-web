'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const user = await db.user.create({
      name: 'Supervisor Mansour',
      email: 'mansour_is_a_cool_guy@gmail.com',
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const event = await db.event.create({
      eventDate: new Date(),
      name: 'Mass exam panic attack',
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('collectionPoints', [
      {
        name: 'MC 1085',
        eventId: event.id,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DC 2531',
        eventId: event.id,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('collectionPoints', null, {});
  },
};

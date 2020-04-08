'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await db.user.create({
      firstName: "Firas",
      lastName: "Mansour",
      email: "mansour_is_a_cool_guy@gmail.com",
      password: "asdfgh1234",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const event = await db.event.create({
      eventDate: new Date(),
      name: "St. Patricks",
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()

    });
      return queryInterface.bulkInsert('collectionPoints', [{
        name: 'Checkpoint 0',      
        eventId: event.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Checkpoint 1',
        eventId: event.id,
        createdAt: new Date(),
        updatedAt: new Date()
        
      },
    ]);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkDelete('collectionPoints', null, {});

  }
};

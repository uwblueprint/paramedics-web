'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const event = await db.event.create({
      eventDate: new Date(),
      name: "St. Patricks",
      pin: "cool",
      description: "Cool day"

    });
      return queryInterface.bulkInsert('collectionPoints', [{
        name: 'Checkpoint 0',      
        eventID: event.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Checkpoint 1',
        eventID: event.id,
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

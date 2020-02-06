'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
         */
      return queryInterface.bulkInsert('incidents', [{
        name: 'Checkpoint 0',
        assignedUsers: 0
      },
      {
        name: 'Checkpoint 1',
        assignedUsers: 8,
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
      return queryInterface.bulkDelete('incidents', null, {});

  }
};

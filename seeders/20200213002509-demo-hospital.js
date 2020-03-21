'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('hospitals', [
        {
          name: 'Hospital 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hospital 2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hospital 3',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('hospitals', null, {});
  }
};

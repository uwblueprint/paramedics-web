'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('groups', [
            {
                id: 1,
                name: 'commander',
            },
            {
                id: 2,
                name: 'supervisor',
            },
            {
                id: 3,
                name: 'dispatch',
            }
        ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('groups', null, {});
  }
};

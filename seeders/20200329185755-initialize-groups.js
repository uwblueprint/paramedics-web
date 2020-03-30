'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('groups', [
            {
                name: 'admin',
            },
            {
                name: 'commander',
            },
            {
                name: 'supervisor',
            }
        ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('groups', null, {});
  }
};

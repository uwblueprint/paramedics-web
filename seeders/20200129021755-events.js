'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [
      {
        name: 'St Patrick\'s Day',
        pin: '1234',
        description: 'bunch of drunk students',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Homecoming',
        pin: 'hmcmng',
        description: 'more drunk students',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {});
  }
};

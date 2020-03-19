'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ambulances', [
      {
        vehicleNumber: 1234,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleNumber: 4567,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleNumber: 8910,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ambulances', null, {});
  }
};

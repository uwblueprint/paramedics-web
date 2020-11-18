'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'ambulances',
      [
        {
          vehicleNumber: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vehicleNumber: 4567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vehicleNumber: 8910,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('ambulances', null, {});
  },
};

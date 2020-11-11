'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'hospitals',
      [
        {
          name: 'Grand River Hospital',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Columbia Ice Field',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mr Paninos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('hospitals', null, {});
  },
};

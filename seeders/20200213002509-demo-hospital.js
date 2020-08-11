'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'hospitals',
      [
        {
          name: 'Hospital 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hospital 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Hospital 3',
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

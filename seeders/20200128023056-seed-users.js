'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Admin',
        email: 'example@example.com',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clark Supervisor',
        email: 'clark.kent@example.com',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chris Dispatch',
        email: 'chris.paul@example.com',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

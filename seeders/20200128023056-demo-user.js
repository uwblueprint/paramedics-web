'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'example@example.com',
        accessLevel: 'COMMANDER',
        emergencyContact: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clark Kent',
        email: 'clark.kent@example.com',
        accessLevel: 'SUPERVISOR',
        emergencyContact: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chris Paul',
        email: 'chris.paul@example.com',
        accessLevel: 'ADMIN',
        emergencyContact: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

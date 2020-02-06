'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        accessLevel: "COMMANDER",
        emergencyContact: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Clark',
        lastName: 'Kent',
        email: 'clark.kent@example.com',
        accessLevel: "SUPERVISOR",
        emergencyContact: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Chris',
        lastName: 'Paul',
        email: 'chris.paul@example.com',
        accessLevel: "ADMIN",
        emergencyContact: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

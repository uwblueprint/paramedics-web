'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'bp_admin',
        lastName: '',
        email: 'paramedics@uwblueprint.org',
        accessLevel: "ADMIN",
        emergencyContact: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('users',
      { email: { [Op.like]: '%paramedics@uwblueprint.org%' } });
  }
};

'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Akshay (Adapta)',
        email: 'akshay@adapta.ca',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('users', {
      email: { [Op.like]: '%akshay@adapta.ca%' },
    });
  },
};

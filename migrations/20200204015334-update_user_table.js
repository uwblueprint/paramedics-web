'use strict';

// Adding accessLevel and emergencyContact columns

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'accessLevel', {
          type: Sequelize.DataTypes.ENUM('COMMANDER', 'SUPERVISOR', 'ADMIN'),
        }, { transaction: t }),
        queryInterface.addColumn('users', 'emergencyContact', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'accessLevel', { transaction: t }),
        queryInterface.removeColumn('users', 'emergencyContact', { transaction: t })
      ]);
    });
  }
};

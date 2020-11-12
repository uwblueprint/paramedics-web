'use strict';

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('users', 'emergencyContact', {
          transaction: t,
        }),
        queryInterface.removeColumn('users', 'password', {
          transaction: t,
        }),
        queryInterface.removeColumn('events', 'pin', {
          transaction: t,
        }),
      ])
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'events',
          'pin',
          {
            allowNull: true,
            type: Sequelize.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'users',
          'password',
          {
            allowNull: true,
            type: Sequelize.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'users',
          'emergencyContact',
          {
            allowNull: true,
            type: Sequelize.STRING,
          },
          { transaction: t }
        ),
      ])
    ),
};

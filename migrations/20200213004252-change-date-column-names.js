'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('events', 'description', {
          transaction: t,
        }),
        queryInterface.removeColumn('events', 'date', {
          transaction: t,
        }),
        queryInterface.addColumn(
          'events',
          'eventDate',
          {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false,
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'events',
          'description',
          {
            type: Sequelize.DataTypes.STRING,
          },
          {
            transaction: t,
          }
        ),
        queryInterface.addColumn(
          'events',
          'date',
          {
            type: Sequelize.DataTypes.STRING,
          },
          {
            transaction: t,
          }
        ),
        queryInterface.removeColumn('events', 'eventDate', {
          transaction: t,
        }),
      ]);
    });
  },
};

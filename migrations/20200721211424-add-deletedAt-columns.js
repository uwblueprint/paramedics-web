'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'events',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'hospitals',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'ambulances',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'patients',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'collectionPoints',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'eventHospitals',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'eventAmbulances',
          'deletedAt',
          {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('users', 'deletedAt', { transaction: t }),
        queryInterface.removeColumn('events', 'deletedAt', { transaction: t }),
        queryInterface.removeColumn('hospitals', 'deletedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('ambulances', 'deletedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('patients', 'deletedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('collectionPoints', 'deletedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('eventHospitals', 'deletedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('eventAmbulances', 'deletedAt', {
          transaction: t,
        }),
      ]);
    });
  },
};

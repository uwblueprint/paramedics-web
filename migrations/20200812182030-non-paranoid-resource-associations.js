'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('eventHospitals', 'deletedAt', {
          transaction: t,
        }),
        queryInterface.removeColumn('eventAmbulances', 'deletedAt', {
          transaction: t,
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
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
};

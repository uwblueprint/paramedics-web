'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('patients', 'ambulanceId', {
      type: Sequelize.DataTypes.INTEGER,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('patients', 'ambulanceId');
  },
};

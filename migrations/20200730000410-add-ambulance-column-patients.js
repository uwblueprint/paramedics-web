'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("patients", "ambulanceId", { type: Sequelize.DataTypes.INTEGER });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("patients", "ambulanceId");
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("patients", "hospitalId", { type: Sequelize.DataTypes.INTEGER });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("patients", "hospitalId");
  }
};

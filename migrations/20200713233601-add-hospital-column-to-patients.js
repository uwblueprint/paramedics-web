'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("patients", "hospitalId", { type: Sequelize.DataTypes.INTEGER });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(
          "patients",
          "hospitalId",
          {
            type: Sequelize.DataTypes.INTEGER
          },
          { transaction: t }
        )
      ]);
    });
  }
};

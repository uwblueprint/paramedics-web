'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "patients",
          "hospitalId",
          {
            type: Sequelize.DataTypes.INTEGER
          },
          { transaction: t }
        )
      ]);
    });
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

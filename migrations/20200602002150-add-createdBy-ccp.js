"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "collectionPoints",
          "createdBy",
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
          "collectionPoints",
          "createdBy",
          {
            type: Sequelize.DataTypes.INTEGER
          },
          { transaction: t }
        )
      ]);
    });
  }
};
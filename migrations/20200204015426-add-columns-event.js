"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "events",
          "date",
          {
            type: Sequelize.DataTypes.STRING
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "events",
          "createdBy",
          {
            type: Sequelize.DataTypes.INTEGER
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "events",
          "isActive",
          {
            type: Sequelize.DataTypes.BOOLEAN
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
          "events",
          "date",
          {
            type: Sequelize.DataTypes.STRING
          },
          { transaction: t }
        ),
        queryInterface.removeColumn(
          "events",
          "createdBy",
          {
            type: Sequelize.DataTypes.INTEGER
          },
          { transaction: t }
        ),
        queryInterface.removeColumn(
          "events",
          "isActive",
          {
            type: Sequelize.DataTypes.Bool
          },
          { transaction: t }
        )
      ]);
    });
  }
};

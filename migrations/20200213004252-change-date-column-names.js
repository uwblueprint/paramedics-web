"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(
          "events",
          "description",
          {
            type: Sequelize.DataTypes.STRING
          },
          { transaction: t }
        ),
        queryInterface.changeColumn("events", "date", {
          type: Sequelize.DATE,
          allowNull: false
        }),
        queryInterface.renameColumn("events", "date", "eventDate")
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "events",
          "description",
          {
            type: Sequelize.DataTypes.STRING
          },
          { transaction: t }
        ),
        queryInterface.renameColumn("events", "eventDate", "date")
      ]);
    });
  }
};

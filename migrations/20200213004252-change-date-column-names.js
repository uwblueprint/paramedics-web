"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("events", "description"),
        queryInterface.removeColumn("events", "date"),
        queryInterface.addColumn("events", "eventDate", {
          type: Sequelize.DataTypes.DATE,
          allowNull: false
        })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("events", "description", {
        type: Sequelize.DataTypes.STRING
      }),
      queryInterface.addColumn("events", "date", {
        type: Sequelize.DataTypes.STRING
      }),
      queryInterface.removeColumn("events", "eventDate")
    ]);
  }
};

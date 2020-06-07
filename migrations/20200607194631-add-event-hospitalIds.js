'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "events",
          "hospitals",
          {
            type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER)
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
          "hospitals",
          {
            type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER)
          },
          { transaction: t }
        )
      ]);
    });
  }
};

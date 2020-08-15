'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('collectionPoints', 'createdBy', {
      type: Sequelize.DataTypes.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('collectionPoints', 'createdBy', {
      type: Sequelize.DataTypes.INTEGER,
    });
  },
};

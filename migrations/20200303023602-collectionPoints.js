'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('collectionPoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      eventID: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collectionPoints');
  }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      runNumber: {
        type: Sequelize.BIGINT
      },
      barcodeValue: {
        type: Sequelize.BIGINT
      },
      incidentId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      triageLevel: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.TEXT
      },
      transportTime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patients');
  }
};
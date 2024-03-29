'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      runNumber: {
        type: Sequelize.BIGINT,
      },
      barcodeValue: {
        type: Sequelize.BIGINT,
      },
      collectionPointId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.DataTypes.ENUM('ON_SITE', 'RELEASED', 'TRANSPORTED'),
      },
      triageCategory: {
        type: Sequelize.INTEGER,
      },
      triageLevel: {
        type: Sequelize.DataTypes.ENUM(
          'WHITE',
          'GREEN',
          'YELLOW',
          'RED',
          'BLACK'
        ),
      },
      notes: {
        type: Sequelize.TEXT,
      },
      transportTime: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('patients', { transaction: t }),
        queryInterface.sequelize.query(
          'DROP TYPE IF EXISTS "enum_patients_triageLevel";',
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          'DROP TYPE IF EXISTS "enum_patients_status";',
          { transaction: t }
        ),
      ]);
    });
  },
};

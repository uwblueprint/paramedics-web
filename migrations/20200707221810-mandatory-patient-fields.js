"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "patients",
          "barcodeValue",
          {
            type: Sequelize.BIGINT,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          'ALTER TABLE patients ALTER COLUMN "triageLevel" TYPE "enum_patients_triageLevel", ALTER COLUMN "triageLevel" SET NOT NULL',
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "patients",
          "barcodeValue",
          {
            type: Sequelize.BIGINT,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          'ALTER TABLE patients ALTER COLUMN "triageLevel" TYPE "enum_patients_triageLevel", ALTER COLUMN "triageLevel" DROP NOT NULL',
          { transaction: t }
        ),
      ]);
    });
  },
};

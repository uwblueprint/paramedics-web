"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn("patients", "barcodeValue", {
          type: Sequelize.BIGINT,
          allowNull: false,
        }),
        queryInterface.sequelize.query(
          'ALTER TABLE patients ALTER COLUMN "triageLevel" TYPE "enum_patients_triageLevel", ALTER COLUMN "triageLevel" SET NOT NULL'
        ),
        // queryInterface.changeColumn("patients", "triageLevel", {
        //   type: Sequelize.DataTypes.ENUM(
        //     "WHITE",
        //     "GREEN",
        //     "YELLOW",
        //     "RED",
        //     "BLACK"
        //   ),
        //   allowNull: false,
        // }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn("patients", "barcodeValue", {
          type: Sequelize.BIGINT,
          allowNull: true,
        }),
        queryInterface.sequelize.query(
          'ALTER TABLE patients ALTER COLUMN "triageLevel" TYPE "enum_patients_triageLevel", ALTER COLUMN "triageLevel" DROP NOT NULL'
        ),
        // queryInterface.changeColumn("patients", "triageLevel", {
        //   type: Sequelize.DataTypes.ENUM(
        //     "WHITE",
        //     "GREEN",
        //     "YELLOW",
        //     "RED",
        //     "BLACK"
        //   ),
        //   allowNull: true,
        // }),
      ]);
    });
  },
};

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("patients", "barcodeValue", {
          transaction: t,
        }),
        queryInterface.addColumn(
          "patients",
          "barcodeValue",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("patients", "barcodeValue", {
          transaction: t,
        }),
        queryInterface.addColumn(
          "patients",
          "barcodeValue",
          {
            type: Sequelize.DataTypes.BIGINT,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};

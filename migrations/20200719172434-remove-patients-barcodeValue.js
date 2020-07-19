"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("patients", "barcodeValue"),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "patients",
        "barcodeValue",
        {
          type: Sequelize.DataTypes.BIGINT,
        },
        { transaction: t }
      ),
    ]);
  },
};

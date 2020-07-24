"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "patients",
          "barcodeValue",
          { type: Sequelize.DataTypes.STRING },
          {
            transaction: t,
          }
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
          { type: 'INTEGER USING CAST("barcodeValue" as INTEGER)' },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },
};

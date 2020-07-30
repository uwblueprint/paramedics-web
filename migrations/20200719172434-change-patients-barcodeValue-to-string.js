"use strict";

module.exports = {
     up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      "patients", "barcodeValue", { type: Sequelize.DataTypes.STRING }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkUpdate('patients',
          { barcodeValue: null },
          { barcodeValue: { [Sequelize.Op.regexp]: '[^0-9]' } },
          { transaction: t }
        ),
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

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE patients SET "barcodeValue" = "id" WHERE "barcodeValue" IS NULL`
    );
    return queryInterface.changeColumn('patients', 'barcodeValue', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.changeColumn('patients', 'barcodeValue', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      }),
      queryInterface.removeConstraint('patients', 'patients_barcodeValue_key'),
    ]);
    return queryInterface.sequelize.query(
      `UPDATE patients SET "barcodeValue" = NULL WHERE "barcodeValue" = "id"::varchar`
    );
  },
};

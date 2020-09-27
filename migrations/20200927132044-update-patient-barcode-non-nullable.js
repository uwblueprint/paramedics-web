'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.sequelize.query(
          `UPDATE patients SET "barcodeValue" = "id" WHERE "barcodeValue" IS NULL`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          'ALTER TABLE patients ALTER COLUMN "barcodeValue" TYPE "varchar", ALTER COLUMN "barcodeValue" SET NOT NULL',
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.sequelize.query(
          'ALTER TABLE patients ALTER COLUMN "barcodeValue" TYPE "varchar", ALTER COLUMN "barcodeValue" DROP NOT NULL',
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE patients SET "barcodeValue" = NULL WHERE "barcodeValue" = "id"::varchar`,
          { transaction: t }
        ),
      ]);
    });
  },
};

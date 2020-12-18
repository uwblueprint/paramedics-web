'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'locationPins',
          'pinType',
          {
            type: Sequelize.DataTypes.ENUM('EVENT', 'CCP', 'OTHER'),
            defaultValue: 'OTHER',
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'locationPins',
          'ccpId',
          {
            type: Sequelize.INTEGER,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('locationPins', 'ccpId', {
          transaction: t,
        }),
        queryInterface.removeColumn('locationPins', 'pinType', {
          transaction: t,
        }),
      ]).then(() =>
        queryInterface.sequelize.query(
          'DROP TYPE IF EXISTS "enum_locationPins_pinType"',
          { transaction: t }
        )
      );
    });
  },
};

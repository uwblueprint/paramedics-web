'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        `DELETE FROM ambulances WHERE "id" NOT IN (SELECT * FROM (SELECT MIN("id") FROM ambulances GROUP BY "vehicleNumber") x)`,
        { transaction: t }
      );
      queryInterface.addConstraint(
        'ambulances',
        {
          fields: ['vehicleNumber'],
          type: 'unique',
        },
        { transaction: t }
      );
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeConstraint(
      'ambulances',
      'ambulances_vehicleNumber_uk'
    );
  },
};

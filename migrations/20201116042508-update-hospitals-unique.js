'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        `DELETE FROM hospitals WHERE "id" NOT IN (SELECT * FROM (SELECT MIN("id") FROM hospitals GROUP BY "name") x)`,
        { transaction: t }
      );
      queryInterface.addConstraint(
        'hospitals',
        {
          fields: ['name'],
          type: 'unique',
        },
        { transaction: t }
      );
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeConstraint('hospitals', 'hospitals_name_uk');
  },
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'roleId',
          { type: Sequelize.DataTypes.INTEGER },
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "roleId" = 1 WHERE "accessLevel" = 'COMMANDER' OR "accessLevel" = 'ADMIN'`,
          { transaction: t }
        ),
        queryInterface.sequelize.query( 
          `UPDATE users SET "roleId" = 2 WHERE "accessLevel" = 'SUPERVISOR'`,
          { transaction: t }
        ),
        queryInterface.removeColumn('users', 'accessLevel', {
          transaction: t,
        })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'accessLevel',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "accessLevel" = 'COMMANDER' WHERE "roleId" = 1`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "accessLevel" = 'SUPERVISOR' WHERE "roleId" = 2`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "accessLevel" = 'DISPATCH' WHERE "roleId" = 3`,
          { transaction: t }
        ),
        queryInterface.removeColumn('users', 'roleId', {
          transaction: t,
        }),
      ]);
    });
  
  },
};

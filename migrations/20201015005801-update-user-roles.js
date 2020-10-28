'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        'users',
        'roleId',
        { type: Sequelize.DataTypes.INTEGER },
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        `UPDATE users SET "roleId" = 1 WHERE "accessLevel" = 'COMMANDER' OR "accessLevel" = 'ADMIN'`,
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        `UPDATE users SET "roleId" = 2 WHERE "accessLevel" = 'SUPERVISOR'`,
        { transaction: t }
      );
      await queryInterface.removeColumn('users', 'accessLevel', {
        transaction: t,
      });
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_users_accessLevel";',
        { transaction: t }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        'users',
        'accessLevel',
        {
          type: Sequelize.DataTypes.ENUM('COMMANDER', 'SUPERVISOR', 'ADMIN'),
        },
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        `UPDATE users SET "accessLevel" = 'COMMANDER' WHERE "roleId" = 1`,
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        `UPDATE users SET "accessLevel" = 'SUPERVISOR' WHERE "roleId" = 2`,
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        `UPDATE users SET "accessLevel" = 'DISPATCH' WHERE "roleId" = 3`,
        { transaction: t }
      );
      await queryInterface.removeColumn('users', 'roleId', {
        transaction: t,
      });
    });
  },
};

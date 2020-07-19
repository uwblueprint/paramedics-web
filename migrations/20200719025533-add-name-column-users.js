'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "users",
        "name",
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction: t }
      )
      await queryInterface.sequelize.query(
        `UPDATE users SET "name" = "firstName" WHERE "lastName"=''`,
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        `UPDATE users SET "name" = CONCAT("firstName", ' ', "lastName") WHERE "lastName"<>''`,
        { transaction: t }
      );
      await queryInterface.removeColumn('users', 'firstName', { transaction: t });
      return queryInterface.removeColumn('users', 'lastName', { transaction: t });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "users",
        "firstName",
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction: t }
      );
      await queryInterface.addColumn(
        "users",
        "lastName",
        {
          type: Sequelize.DataTypes.STRING,
        },
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        'UPDATE users SET "firstName" = "name", "lastName" = "name"',
        { transaction: t }
      );
      return queryInterface.removeColumn('users', 'name', { transaction: t });
    });
  }
};

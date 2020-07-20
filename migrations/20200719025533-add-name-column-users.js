'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "name",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "name" = "firstName" WHERE "lastName"='' AND "firstName"<>''`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "name" = "lastName" WHERE "firstName"='' AND "lastName"<>''`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "name" = CONCAT("firstName", ' ', "lastName") WHERE "lastName"<>'' AND "firstName"<>''`,
          { transaction: t }
        ),
        queryInterface.removeColumn('users', 'firstName', { transaction: t }),
        queryInterface.removeColumn('users', 'lastName', { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "firstName",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "users",
          "lastName",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "firstName" = "name", "lastName" = '' WHERE "name" NOT LIKE '% %'`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE "users" SET "firstName" = SPLIT_PART("name", ' ', 1), "lastName" = SPLIT_PART("name", ' ', 2) WHERE "name" LIKE '% %'`,
          { transaction: t }
        ),
        queryInterface.removeColumn('users', 'name', { transaction: t }),
      ]);
    });
  }
};

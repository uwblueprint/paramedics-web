'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'role',
          { type: Sequelize.DataTypes.INTEGER },
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "role" = 1 WHERE "accessLevel" = 'COMMANDER' OR "accessLevel" = 'ADMIN'`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "role" = 2 WHERE "accessLevel" = 'SUPERVISOR'`,
          { transaction: t }
        ),
        // queryInterface.sequelize.query(
        //   `UPDATE users SET "role" = 3 WHERE "accessLevel" = 'DISPATCH'`
        // ,
        // { transaction: t }
        // ),
        queryInterface.removeColumn('users', 'accessLevel', {
          transaction: t,
        }),
      ]);
      //   return Promise(() => {
      //     queryInterface.addColumn(
      //       'users',
      //       'role',
      //       { type: Sequelize.DataTypes.INTEGER },
      //       { transaction: t }
      //     )
      //   })
      //   .then(() => {
      //     return Promise(() => {
      //       queryInterface.sequelize.query(
      //         `UPDATE users SET "role" = 1 where "accessLevel" = "COMMANDER"`,
      //       { transaction: t }
      //       )})
      //       .then(() => {
      //       return Promise(() => {
      //         queryInterface.sequelize.query(
      //           `UPDATE users SET "role" = 2 where "accessLevel" = "SUPERVISOR"`
      //         ,
      //         { transaction: t }
      //       )})
      //         .then(() => {
      //           return Promise(() => {
      //             queryInterface.sequelize.query(
      //               `UPDATE users SET "role" = 3 where "accessLevel" = "DISPATCH"`
      //             ,
      //             { transaction: t }
      //           )})
      //           .then(() => {
      //             return Promise(() => {
      //               queryInterface.removeColumn('users', 'accessLevel', {
      //                 transaction: t,
      //               })
      //               });
      //           });
      //         });
      //       });
      //   });
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
          `UPDATE users SET "accessLevel" = 'COMMANDER' WHERE "role" = 1`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "accessLevel" = 'SUPERVISOR' WHERE "role" = 2`,
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          `UPDATE users SET "accessLevel" = 'DISPATCH' WHERE "role" = 3`,
          { transaction: t }
        ),
        queryInterface.removeColumn('users', 'role', {
          transaction: t,
        }),
      ]);
    });
    // return queryInterface.sequelize.transaction((t) => {
    //   return Promise(() => {
    //     queryInterface.addColumn(
    //       'users',
    //       'accessLevel',
    //       { type: Sequelize.DataTypes.ENUM('COMMANDER', 'SUPERVISOR', 'ADMIN') },
    //       { transaction: t }
    //     )
    //   })
    //   .then(() => {
    //     return Promise(() => {
    //       queryInterface.sequelize.query(
    //         `UPDATE users SET "accessLevel" = "COMMANDER" where "role" = 1`
    //       ,
    //       { transaction: t }
    //     )})
    //       .then(() => {
    //       return Promise(() => {
    //         queryInterface.sequelize.query(
    //           `UPDATE users SET "accessLevel" = "SUPERVISOR" where "role" = 2`
    //         ,
    //         { transaction: t }
    //       )})
    //         .then(() =>{
    //           return Promise(() => {
    //             queryInterface.sequelize.query(
    //               `UPDATE users SET "accessLevel" = "DISPATCH" where "role" = 3`
    //             ,
    //             { transaction: t }
    //           )})
    //           .then(() => {
    //             return Promise(() => {
    //               queryInterface.removeColumn('users', 'accessLevel', {
    //                 transaction: t,
    //               })
    //               });
    //           });
    //         });
    //       });
    //   });
    // });
  },
};

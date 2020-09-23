'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return queryInterface.createTable('roles', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING
          }
        }, { transaction: t }).then(() => {
          queryInterface.bulkInsert('roles', [
            {
              id: 1,
              name: 'commander',
            },
            {
              id: 2,
              name: 'supervisor',
            },
            {
              id: 3,
              name: 'dispatch',
            }
          ], { transaction: t })
        }).catch((e) => {
          console.log(e);
        })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return queryInterface.dropTable('roles', { transaction: t });
    })
  }
};

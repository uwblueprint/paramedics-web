'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      queryInterface
        .createTable(
          'roles',
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            name: {
              type: Sequelize.STRING,
            },
            displayName: {
              type: Sequelize.STRING,
            },
          },
          { transaction: t }
        )
        .then(() =>
          queryInterface.bulkInsert(
            'roles',
            [
              {
                id: 1,
                name: 'COMMANDER',
                displayName: 'Commander',
              },
              {
                id: 2,
                name: 'SUPERVISOR',
                displayName: 'Supervisor',
              },
              {
                id: 3,
                name: 'DISPATCH',
                displayName: 'Dispatch',
              },
            ],
            { transaction: t }
          )
        )
    );
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) =>
      queryInterface.dropTable('roles', { transaction: t })
    );
  },
};

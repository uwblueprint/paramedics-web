'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkUpdate(
          'patients',
          { gender: 'F' },
          {
            gender: {
              [Sequelize.Op.notIn]: ['F', 'Female', 'Male', 'M'],
            },
          },
          { transaction: t }
        ),
        queryInterface.bulkUpdate(
          'patients',
          { gender: 'F' },
          { gender: 'Female' },
          { transaction: t }
        ),
        queryInterface.bulkUpdate(
          'patients',
          { gender: 'M' },
          { gender: 'Male' },
          { transacton: t }
        ),
      ]).then(() =>
        queryInterface.changeColumn(
          'patients',
          'gender',
          {
            type: Sequelize.DataTypes.ENUM('M', 'F'),
          },
          {
            transaction: t,
          }
        )
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'patients',
          'gender',
          {
            type: Sequelize.DataTypes.STRING,
          },
          {
            transaction: t,
          }
        ),
      ])
        .then(
          queryInterface.sequelize.query('DROP TYPE enum_patients_gender;', {
            transaction: t,
          })
        )
        .then(
          queryInterface.bulkUpdate(
            'patients',
            { gender: 'Male' },
            { gender: 'M' },
            { transaction: t }
          ),
          queryInterface.bulkUpdate(
            'patients',
            { gender: 'Female' },
            { gender: 'F' },
            { transaction: t }
          )
        );
    });
  },
};

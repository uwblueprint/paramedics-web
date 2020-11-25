'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('locationPins', 'pinType', {
          type: Sequelize.DataTypes.ENUM('EVENT', 'CCP', 'OTHER'),
        }, {transaction: t}),
        queryInterface.addColumn('locationPins', 'ccpParentId', {
          type: Sequelize.INTEGER,
        }, {transaction: t}),
        queryInterface.addColumn('locationPins', 'eventParentId', {
          type: Sequelize.INTEGER,
        }, {transaction: t})
      ])
    })
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('locationPins', 'eventParentId', {transaction: t}),
        queryInterface.removeColumn('locationPins', 'ccpParentId', {transaction: t}),
        queryInterface.removeColumn('locationPins', 'pinType', {transaction: t}),
        queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_locationPins_pinType"', {transaction: t}),
      ])
    })
  }
};

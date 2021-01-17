'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('patients', 'ctas', {
      type: Sequelize.DataTypes.INTEGER,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('patients', 'ctas');
  },
};

'use strict';

const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return replaceEnum({
      queryInterface,
      tableName: 'patients',
      columnName: 'status',
      newValues: ['ON_SITE', 'RELEASED', 'TRANSPORTED', 'DELETED'],
      enumName: 'enum_patients_status'
    });
  },

  down: (queryInterface, Sequelize) => {
    return replaceEnum({
      queryInterface,
      tableName: 'patients',
      columnName: 'status',
      newValues: ['ON_SITE', 'RELEASED', 'TRANSPORTED'],
      enumName: 'enum_patients_status'
    });
  }
};

'use strict';

const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: (queryInterface) => {
    return replaceEnum({
      queryInterface,
      tableName: 'patients',
      columnName: 'status',
      newValues: ['ON_SITE', 'RELEASED', 'TRANSPORTED', 'DELETED'],
      enumName: 'enum_patients_status',
    });
  },

  down: (queryInterface) => {
    return replaceEnum({
      queryInterface,
      tableName: 'patients',
      columnName: 'status',
      newValues: ['ON_SITE', 'RELEASED', 'TRANSPORTED'],
      enumName: 'enum_patients_status',
    });
  },
};

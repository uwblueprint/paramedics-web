'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
  });

  return Role;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'role',
    {
      name: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return Role;
};

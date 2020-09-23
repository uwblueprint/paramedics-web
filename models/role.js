'use strict';

module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
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

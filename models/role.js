'use strict';

module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'roles',
    {
      name: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return role;
};

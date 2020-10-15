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

  role.associate = (models) => {
    role.hasMany(models.user);
  };

  return role;
};

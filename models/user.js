'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      emergencyContact: DataTypes.STRING,
    },
    { paranoid: true }
  );

  User.associate = (models) => {
    User.belongsTo(models.role, {
      targetKey: 'id',
      foreignKey: 'roleId',
    });
  };
  return User;
};

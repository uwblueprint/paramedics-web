'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      accessLevel: {
        type: DataTypes.ENUM,
        values: ['COMMANDER', 'SUPERVISOR', 'ADMIN'],
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      emergencyContact: DataTypes.STRING,
    },
    {}
  );
  return User;
};

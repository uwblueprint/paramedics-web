'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    accessLevel: {
      type: DataTypes.ENUM,
      values: ['COMMANDER', 'SUPERVISOR', 'ADMIN']
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    emergencyContact: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User
};

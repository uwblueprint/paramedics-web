'use strict';

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    name: DataTypes.STRING,
    codename: DataTypes.STRING
  }, {
    timestamps: false,
  });
  Permission.associate = function(models) {
  };
  return Permission;
};

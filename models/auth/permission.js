'use strict';

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    name: DataTypes.STRING,
    codename: DataTypes.STRING
  }, {});
  Permission.associate = function(models) {
  };
  return Permission;
};

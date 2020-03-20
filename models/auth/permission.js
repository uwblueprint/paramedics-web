'use strict';

const Group = require("./group");

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
    codename: DataTypes.STRING
  }, {});
  Permission.associate = function(models) {
    Permission.belongsToMany(Group, { through: 'GroupPermissions' });
  };
  return Permission;
};

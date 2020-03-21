'use strict';

const Permission = require('./permission');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    name: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    Group.belongsToMany(Permission(sequelize, DataTypes), { through: 'GroupPermissions' });
  };
  Permission.associate = function(models) {
    Permission.belongsToMany(Group(sequelize, DataTypes), { through: 'GroupPermissions' });
  };
  return Group;
};

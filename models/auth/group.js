'use strict';

const Permission = require('./permission');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    Group.belongsToMany(Permission, { through: 'GroupPermissions' });
  };
  return Group;
};

'use strict';

const Permission = require('./permission');
const groupPermission = require('./groupPermission');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
  });
  // hasPerm checks if group_id has perm
  Group.prototype.hasPerm = async function(group_id, perm) {
    let permission = await Group.findOne({
      where: {
        id: group_id
      },
      include: [{
        model: Permission(sequelize, DataTypes),
        where: { codename: perm},
        required: true
      }]
    });
    console.log(permission);
    return permission != null;
  };
  Group.associate = function(models) {
    Group.belongsToMany(Permission(sequelize, DataTypes), { through: groupPermission(sequelize, DataTypes) });
  };
  Permission.associate = function(models) {
    Permission.belongsToMany(Group(sequelize, DataTypes), { through: groupPermission(sequelize, DataTypes) });
  };
  return Group;
};

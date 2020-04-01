'use strict';

const Permission = require('./permission');
const groupPermission = require('./groupPermission');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
  });
  Group.prototype.hasPerm = async function(perm) {
    let permission = await Group.findOne({
      include: [{
        model: Permission(sequelize, DataTypes),
        where: { codename: perm},
        required: true
      }]
    });
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

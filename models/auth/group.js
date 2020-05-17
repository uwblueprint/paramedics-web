'use strict';

const Permission = require('./permission');
const groupPermission = require('./groupPermission');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
  });
  // TODO: Replace raw query with ORM queries
  Group.prototype.hasPerm = async function(group_id, perm) {
    let [res, _] = await sequelize.query('SELECT count(*) FROM permissions p INNER JOIN "groupPermissions" gp ON p.id = gp."permissionId" WHERE p.codename=\'' + 
    perm + '\' AND gp."groupId" = ' + group_id);
    return res[0].count != 0;
  };
  Group.associate = function(models) {
    Group.belongsToMany(Permission(sequelize, DataTypes), { through: groupPermission(sequelize, DataTypes) });
  };
  Permission.associate = function(models) {
    Permission.belongsToMany(Group(sequelize, DataTypes), { through: groupPermission(sequelize, DataTypes) });
  };
  return Group;
};

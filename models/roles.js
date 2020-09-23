'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
  });
  // hasPerm checks if group_id has perm
  Role.prototype.hasPerm = async function(group_id, perm) {
    let permission = await Group.findOne({
      where: {
        id: group_id
      },
      include: [{
        model: Permission(sequelize, DataTypes),
        where: { codename: perm },
        required: true
      }]
    });
    return permission != null;
  };

  return Role;
};

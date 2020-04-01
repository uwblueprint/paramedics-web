'use strict';

module.exports = (sequelize, DataTypes) => {
  const groupPermission = sequelize.define('groupPermission', {
    groupId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    timestamps: false,
  });
  groupPermission.associate = function(models) {
    // associations can be defined here
  };
  return groupPermission;
};

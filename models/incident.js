'use strict';
module.exports = (sequelize, DataTypes) => {
  const Incident = sequelize.define('incident', {
    name: DataTypes.STRING,
    //TODO: Add Location (coordinate)
    createdAt: Date,
    updatedAt: Date,
    assignedUsers: DataTypes.INTEGER
  }, {});
  Incident.associate = function(models) {
    // associations can be defined here
  };
  return Incident;
};
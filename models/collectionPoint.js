'use strict';
module.exports = (sequelize, DataTypes) => {
  const collectionPoint = sequelize.define('collectionPoint', {
    name: DataTypes.STRING,
    //TODO: Add Location (coordinate)
    createdAt: Date,
    updatedAt: Date,
    assignedUsers: DataTypes.INTEGER
  }, {});
  collectionPoint.associate = function(models) {
    // associations can be defined here


  
  };
  return collectionPoint;
};
'use strict';

const Event = require("./event");

module.exports = (sequelize, DataTypes) => {
  const collectionPoint = sequelize.define('collectionPoint', {
    name: DataTypes.STRING,
    //TODO: Add Location (coordinate)
    createdAt: Date,
    updatedAt: Date,
  }, {});
  collectionPoint.associate = function(models) {
    // associations can be defined here

    collectionPoint.belongsTo(Event(sequelize, DataTypes), {

      foreignKey: "eventID",
      targetKey: "id"

    });

  };
  return collectionPoint;
};
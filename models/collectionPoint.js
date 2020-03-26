'use strict';

const Event = require("./event");

module.exports = (sequelize, DataTypes) => {
  const collectionPoint = sequelize.define('collectionPoint', {
    name: DataTypes.STRING,
    eventID: DataTypes.INTEGER
    //TODO: Add Location (coordinate)
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
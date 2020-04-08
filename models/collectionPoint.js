'use strict';

const Event = require("./event");

module.exports = (sequelize, DataTypes) => {
  const collectionPoint = sequelize.define('collectionPoint', {
    name: DataTypes.STRING,
    eventId: DataTypes.INTEGER
    //TODO: Add Location (coordinate)
  }, {});
  collectionPoint.associate = function(models) {
    // associations can be defined here

    collectionPoint.belongsTo(Event(sequelize, DataTypes), {

      foreignKey: "eventId",
      targetKey: "id"

    });

  };
  return collectionPoint;
};
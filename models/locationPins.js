"use strict";

const Event = require("./event");

module.exports = (sequelize, DataTypes) => {
  const locationPin = sequelize.define(
    "locationPins",
    {
      label: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
    },
    {}
  );
  locationPin.associate = function (models) {
    // associations can be defined here

    locationPin.belongsTo(Event(sequelize, DataTypes), {
      foreignKey: "eventId",
      targetKey: "id",
    });
  };
  return locationPin;
};
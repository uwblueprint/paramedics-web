"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      name: DataTypes.STRING,
      date: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      description: DataTypes.STRING
    },
    {}
  );
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};

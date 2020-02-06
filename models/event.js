"use strict";
const User = require("./user");
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
  Event.belongsTo(User);
  return Event;
};

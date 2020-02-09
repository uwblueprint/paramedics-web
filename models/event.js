"use strict";
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      name: DataTypes.STRING,
      date: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      description: DataTypes.STRING
    },
    {}
  );
  Event.associate = models => {
    Event.belongsTo(User(sequelize, DataTypes), {
      foreignKey: "createdBy",
      targetKey: "id"
    });
  };
  return Event;
};

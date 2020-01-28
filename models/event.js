'use strict';
module.exports = (sequelize, DataTypes) => {
  // TODO: Check if table name is lowercase
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    pin: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};

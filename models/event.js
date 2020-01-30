'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    name: DataTypes.STRING,
    pin: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};

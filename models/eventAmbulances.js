'use strict';

module.exports = (sequelize, DataTypes) => {
  const eventAmbulances = sequelize.define('eventAmbulances', {
    eventId: DataTypes.INTEGER,
    ambulanceId: DataTypes.INTEGER,
  }, {});
  eventAmbulances.associate = function(models) {
      // define associations here
  };
  
  return eventAmbulances;
};
'use strict';

module.exports = (sequelize, DataTypes) => {
  const eventHospitals = sequelize.define('eventHospitals', {
    eventId: DataTypes.INTEGER,
    hospitalId: DataTypes.INTEGER,
  }, {});
  eventHospitals.associate = function(models) {
      // define associations here
  };
  
  return eventHospitals;
};
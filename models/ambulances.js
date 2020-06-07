'use strict';

const Event = require('./event');

module.exports = (sequelize, DataTypes) => {
  const ambulances = sequelize.define('ambulance', {
    vehicleNumber: DataTypes.INTEGER
  }, {});
  ambulances.associate = function(models) {
    ambulances.belongsToMany(models.event, { through: 'EventAmbulances' });
    // ambulances.belongsToMany(Event, { through: 'EventAmbulances' });
  };

  return ambulances;
};
'use strict';

module.exports = (sequelize, DataTypes) => {
  const ambulances = sequelize.define('ambulance', {
    vehicleNumber: DataTypes.INTEGER
  }, {});
  ambulances.associate = function(models) {
    ambulances.belongsToMany(models.event, { through: 'EventAmbulances' });
  };
  return ambulances;
};
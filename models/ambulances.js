'use strict';
module.exports = (sequelize, DataTypes) => {
  const ambulances = sequelize.define('ambulance', {
    vehicleNumber: DataTypes.INTEGER
  }, {});
  ambulances.associate = function(models) {
    // associations can be defined here
  };
  return ambulances;
};
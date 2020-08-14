'use strict';

module.exports = (sequelize, DataTypes) => {
  const eventHospitals = sequelize.define('eventHospitals', {
    eventId: DataTypes.INTEGER,
    hospitalId: DataTypes.INTEGER,
  });
  eventHospitals.associate = (models) => {
    eventHospitals.belongsTo(models.event);
    eventHospitals.belongsTo(models.hospital);
  };

  return eventHospitals;
};

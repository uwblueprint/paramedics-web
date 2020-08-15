'use strict';

module.exports = (sequelize, DataTypes) => {
  const eventAmbulances = sequelize.define('eventAmbulances', {
    eventId: DataTypes.INTEGER,
    ambulanceId: DataTypes.INTEGER,
  });
  eventAmbulances.associate = (models) => {
    eventAmbulances.belongsTo(models.event);
    eventAmbulances.belongsTo(models.ambulance);
  };

  return eventAmbulances;
};

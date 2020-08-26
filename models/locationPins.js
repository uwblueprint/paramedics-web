'use strict';

module.exports = (sequelize, DataTypes) => {
  const locationPin = sequelize.define(
    'locationPins',
    {
      label: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      address: DataTypes.STRING,
    },
    { paranoid: true }
  );
  locationPin.associate = (models) => {
    // associations can be defined here

    locationPin.belongsTo(models.event, {
      foreignKey: 'eventId',
      targetKey: 'id',
    });
  };
  return locationPin;
};

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
      pinType: {
        type: DataTypes.ENUM,
        values: ['OTHER', 'CCP', 'EVENT'],
      },
      ccpId: DataTypes.INTEGER,
    },
    { paranoid: true }
  );
  locationPin.associate = (models) => {
    // associations can be defined here

    locationPin.belongsTo(models.event, {
      foreignKey: 'eventId',
      targetKey: 'id',
    });

    locationPin.belongsTo(models.collectionPoint, {
      foreignKey: 'ccpId',
      targetKey: 'id',
    });
  };
  return locationPin;
};

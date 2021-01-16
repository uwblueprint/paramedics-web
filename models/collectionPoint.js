'use strict';

module.exports = (sequelize, DataTypes) => {
  const collectionPoint = sequelize.define(
    'collectionPoint',
    {
      name: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
      // TODO: Add Location (coordinates)
    },
    {
      paranoid: true,
      hooks: {
        afterDestroy: (instance) => {
          instance
            .getPatients()
            .then((patients) => patients.map((patient) => patient.destroy()));

          instance.getLocationPin().then((pin) => pin.destroy());
        },
        afterRestore: (instance) => {
          instance
            .getPatients({ paranoid: false })
            .then((patients) => patients.map((patient) => patient.restore()));
          instance
            .getLocationPin({ paranoid: false })
            .then((pin) => pin.restore());
        },
      },
    }
  );
  collectionPoint.associate = (models) => {
    collectionPoint.hasMany(models.patient, {
      hooks: true,
    });

    collectionPoint.hasOne(models.locationPins, {
      foreignKey: 'ccpId',
      targetKey: 'id',
      hooks: true,
    });

    collectionPoint.belongsTo(models.user, {
      foreignKey: 'createdBy',
      targetKey: 'id',
    });

    collectionPoint.belongsTo(models.event, {
      foreignKey: 'eventId',
      targetKey: 'id',
    });
  };
  return collectionPoint;
};

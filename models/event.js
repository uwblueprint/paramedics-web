'use strict';

const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'event',
    {
      name: DataTypes.STRING,
      eventDate: DataTypes.DATEONLY,
      isActive: DataTypes.BOOLEAN,
    },
    {
      paranoid: true,
      hooks: {
        afterDestroy: (instance) => {
          instance
            .getCollectionPoints()
            .then((collectionPoints) =>
              collectionPoints.map((collectionPoint) =>
                collectionPoint.destroy()
              )
            );
        },
        afterRestore: (instance) => {
          instance
            .getCollectionPoints({ paranoid: false })
            .then((collectionPoints) =>
              collectionPoints.map((collectionPoint) =>
                collectionPoint.restore()
              )
            );
        },
      },
    }
  );
  Event.associate = (models) => {
    Event.hasMany(models.collectionPoint, {
      hooks: true,
    });

    Event.belongsTo(User(sequelize, DataTypes), {
      foreignKey: 'createdBy',
      targetKey: 'id',
    });

    Event.belongsToMany(models.ambulance, {
      through: 'eventAmbulances',
      foreignKey: 'eventId',
    });

    Event.belongsToMany(models.hospital, {
      through: 'eventHospitals',
      foreignKey: 'eventId',
    });
  };

  return Event;
};

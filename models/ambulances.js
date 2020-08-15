'use strict';

module.exports = (sequelize, DataTypes) => {
  const ambulances = sequelize.define(
    'ambulance',
    {
      vehicleNumber: DataTypes.INTEGER,
    },
    { paranoid: true }
  );
  ambulances.associate = (models) => {
    ambulances.belongsToMany(models.event, {
      through: 'eventAmbulances',
      foreignKey: 'ambulanceId',
    });
  };

  return ambulances;
};

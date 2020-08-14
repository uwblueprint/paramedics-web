'use strict';

module.exports = (sequelize, DataTypes) => {
  const hospitals = sequelize.define(
    'hospital',
    {
      name: DataTypes.STRING,
    },
    { paranoid: true }
  );
  hospitals.associate = (models) => {
    hospitals.belongsToMany(models.event, {
      through: 'eventHospitals',
      foreignKey: 'hospitalId',
    });
  };

  return hospitals;
};

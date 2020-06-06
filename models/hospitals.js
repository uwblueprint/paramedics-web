'use strict';

module.exports = (sequelize, DataTypes) => {
  const hospitals = sequelize.define('hospital', {
    name: DataTypes.STRING
  }, {});
  hospitals.associate = function(models) {
    hospitals.belongsToMany(models.event, { through: 'EventHospitals' })
  };
  return hospitals;
};
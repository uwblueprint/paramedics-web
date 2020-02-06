'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    runNumber: DataTypes.BIGINT,
    barcodeValue: DataTypes.BIGINT,
    incidentId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    triageLevel: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    transportTime: DataTypes.DATE
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    runNumber: DataTypes.BIGINT,
    barcodeValue: DataTypes.BIGINT,
    incidentId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    triageLevel: {
      type: DataTypes.ENUM,
      values: ['WHITE', 'GREEN', 'YELLOW', 'RED', 'BLACK']
    },
    notes: DataTypes.TEXT,
    transportTime: DataTypes.DATE
  }, {});
  patient.associate = function (models) {
    // associations can be defined here
  };
  return patient;
};
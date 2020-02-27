'use strict';
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    runNumber: DataTypes.BIGINT,
    barcodeValue: DataTypes.BIGINT,
    incidentId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['ON_SITE', 'RELEASED', 'TRANSPORTED']
    },
    triageCategory: DataTypes.INTEGER,
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

// TODO: incidentId should be a foreign key
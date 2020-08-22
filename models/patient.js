'use strict';

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'patient',
    {
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      runNumber: DataTypes.BIGINT,
      barcodeValue: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ['ON_SITE', 'RELEASED', 'TRANSPORTED', 'DELETED'],
      },
      triageCategory: DataTypes.INTEGER,
      triageLevel: {
        type: DataTypes.ENUM,
        values: ['WHITE', 'GREEN', 'YELLOW', 'RED', 'BLACK'],
      },
      notes: DataTypes.TEXT,
      transportTime: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { paranoid: true }
  );
  Patient.associate = (models) => {
    Patient.belongsTo(models.collectionPoint, {
      foreignKey: 'collectionPointId',
      targetKey: 'id',
    });
    Patient.belongsTo(models.hospital, {
      foreignKey: 'hospitalId',
      targetKey: 'id',
    });
    Patient.belongsTo(models.ambulance, {
      foreignKey: 'ambulanceId',
      targetKey: 'id',
    });
  };
  return Patient;
};

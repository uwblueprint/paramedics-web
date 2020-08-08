"use strict";

const collectionPoint = require("./collectionPoint");
const hospitals = require("./hospitals");
const ambulances = require("./ambulances");

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "patient",
    {
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      runNumber: DataTypes.BIGINT,
      barcodeValue: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["ON_SITE", "RELEASED", "TRANSPORTED"],
      },
      triageCategory: DataTypes.INTEGER,
      triageLevel: {
        type: DataTypes.ENUM,
        values: ["WHITE", "GREEN", "YELLOW", "RED", "BLACK"],
      },
      notes: DataTypes.TEXT,
      transportTime: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { paranoid: true }
  );
  Patient.associate = (models) => {
    Patient.belongsTo(collectionPoint(sequelize, DataTypes), {
      foreignKey: "collectionPointId",
      targetKey: "id",
    });
    Patient.belongsTo(hospitals(sequelize, DataTypes), {
      foreignKey: "hospitalId",
      targetKey: "id",
    });
    Patient.belongsTo(ambulances(sequelize, DataTypes), {
      foreignKey: "ambulanceId",
      targetKey: "id",
    });
  };
  return Patient;
};

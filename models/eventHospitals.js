"use strict";

module.exports = (sequelize, DataTypes) => {
  const eventHospitals = sequelize.define(
    "eventHospitals",
    {
      eventId: DataTypes.INTEGER,
      hospitalId: DataTypes.INTEGER,
    },
    { paranoid: true }
  );
  eventHospitals.associate = function (models) {
    // define associations here
  };

  return eventHospitals;
};

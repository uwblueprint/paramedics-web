"use strict";

const User = require("./user");
const Hospital = require("./hospitals");
const Ambulance = require("./ambulances");

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      name: DataTypes.STRING,
      eventDate: DataTypes.DATEONLY,
      isActive: DataTypes.BOOLEAN
    },
    {}
  );
  Event.associate = models => {
    
    Event.belongsTo(User(sequelize, DataTypes), {
      foreignKey: "createdBy",
      targetKey: "id"
    });

    Event.belongsToMany(models.ambulance, { through: 'EventAmbulances' });
    Event.belongsToMany(models.hospital, { through: 'EventHospitals' });
    // Event.belongsToMany(Ambulance, { through: 'EventAmbulances' });
    // Event.belongsToMany(Hospital, { through: 'EventHospitals' });
  };

  return Event;
};

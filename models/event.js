"use strict";

const User = require("./user");

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

    Event.belongsToMany(models.ambulance, { through: 'EventAmbulances' })
    Event.belongsToMany(models.hospital, { through: 'EventHospitals' });
    
  };
  return Event;
};

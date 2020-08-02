"use strict";

const Event = require("./event");
const User = require("./user");

module.exports = (sequelize, DataTypes) => {
  const collectionPoint = sequelize.define(
    "collectionPoint",
    {
      name: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
      //TODO: Add Location (coordinate)
    },
    {
      paranoid: true,
      hooks: {
        afterDestroy: function (instance, options) {
          instance.getPatients().then((patients) =>
            patients.map((patient) => {
              patient.destroy();
            })
          );
        },
        afterRestore: function (instance, options) {
          instance
            .getPatients({ paranoid: false })
            .then((patients) => patients.map((patient) => patient.restore()));
        },
      },
    }
  );
  collectionPoint.associate = function (models) {
    // associations can be defined here
    collectionPoint.hasMany(models.patient, {
      hooks: true,
    });

    collectionPoint.belongsTo(User(sequelize, DataTypes), {
      foreignKey: "createdBy",
      targetKey: "id",
    });

    collectionPoint.belongsTo(Event(sequelize, DataTypes), {
      foreignKey: "eventId",
      targetKey: "id",
    });
  };
  return collectionPoint;
};

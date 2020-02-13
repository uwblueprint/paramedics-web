'use strict';
module.exports = (sequelize, DataTypes) => {
  const hospitals = sequelize.define('hospitals', {
    name: DataTypes.STRING
  }, {});
  hospitals.associate = function(models) {
    // associations can be defined here
  };
  return hospitals;
};
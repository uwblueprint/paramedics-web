'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('hospital', {
    name: DataTypes.STRING
  }, {});
  Hospital.associate = function(models) {
    // associations can be defined here
  };
  return User
};

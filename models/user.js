'use strict';
const { Sequelize, DataTypes } = require('sequelize');

// TODO: this stuff can be set to env variables
const sequelize = new Sequelize('paramedics-db', 'robot', 'robot_pwd', {
  host: 'paramedics-db',
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {});
User.associate = function(models) {
  // associations can be defined here
};

exports.User = User;

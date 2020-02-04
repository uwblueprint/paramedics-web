'use strict';
module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        gender: DataTypes.STRING,
        age: DataTypes.INTEGER,
        runNumber: DataTypes.BIGINT, // TODO: Clarify
        barcodeValue: DataTypes.BIGINT, // TODO: Clarify
        incidentId: DataTypes.INTEGER, // TODO: foreign key
        status: DataTypes.STRING,
        triageLevel: DataTypes.ENUM, // TODO: Clarify
        notes: DataTypes.TEXT,
        transportTime: DataTypes.DATE, // TODO: Need custom date type
    }, {});
    Patient.associate = function (models) {
        // associations can be defined here
    };
    return Patient;
};

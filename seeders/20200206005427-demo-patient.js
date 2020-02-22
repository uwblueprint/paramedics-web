'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('patients', [{
      gender: 'Male',
      age: 19,
      runNumber: 2636337,
      barcodeValue: 1525242,
      incidentId: 1525243,
      status: 'In Transportation',
      triageLevel: 'YELLOW',
      notes: 'This guy looks super drunk',
      transportTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      gender: 'Female',
      age: 20,
      runNumber: 65433,
      barcodeValue: 987654,
      incidentId: 3345456,
      status: 'In Transportation',
      triageLevel: 'GREEN',
      notes: 'needs a bandaid',
      transportTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      gender: 'unknown',
      age: 21,
      runNumber: 65433,
      barcodeValue: 987654,
      incidentId: 3345456,
      status: 'deceased',
      triageLevel: 'BLACK',
      notes: ':(',
      transportTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('patients', null, {});
  }
};

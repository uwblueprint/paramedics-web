'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const user = await db.user.create({
      name: 'Admin Vader',
      email: 'darthvader@sithlords.com',
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const event = await db.event.create({
      eventDate: new Date(),
      name: 'Death Star Launch Day',
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const collectionPoint = await db.collectionPoint.create({
      name: 'Checkpoint Tatooine',
      eventId: event.id,
      createdBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const hospital = await db.hospital.create({
      name: 'Endor Base',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const ambulance = await db.ambulance.create({
      vehicleNumber: 5454,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await Promise.all([
      queryInterface.bulkInsert('eventAmbulances', [
        {
          eventId: event.id,
          ambulanceId: ambulance.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
      queryInterface.bulkInsert('eventHospitals', [
        {
          eventId: event.id,
          hospitalId: hospital.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);

    return queryInterface.bulkInsert('patients', [
      {
        gender: 'M',
        age: 19,
        barcodeValue: '1234abcd',
        collectionPointId: collectionPoint.id,
        status: 'ON_SITE',
        triageCategory: 3,
        triageLevel: 'YELLOW',
        notes: 'This guy looks super drunk',
        transportTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'F',
        age: 45,
        runNumber: 65433,
        barcodeValue: '12345abcde',
        collectionPointId: collectionPoint.id,
        status: 'RELEASED',
        triageCategory: 1,
        triageLevel: 'GREEN',
        notes: 'needs a bandaid has green lightsaber',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'M',
        age: 21,
        runNumber: 65433,
        barcodeValue: '123456abcdef',
        collectionPointId: collectionPoint.id,
        status: 'TRANSPORTED',
        triageCategory: 5,
        triageLevel: 'BLACK',
        ambulanceId: ambulance.id,
        hospitalId: hospital.id,
        transportTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('patients', null, {});
  },
};

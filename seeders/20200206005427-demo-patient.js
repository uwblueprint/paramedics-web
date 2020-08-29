'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const user = await db.user.create({
      name: 'Darth Vader',
      email: 'darthvader@sithlords.com',
      accessLevel: 'COMMANDER',
      password: 'ga1axyru1er',
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

    return queryInterface.bulkInsert('patients', [
      {
        gender: 'M',
        age: 19,
        barcodeValue: '1525242sa',
        collectionPointId: collectionPoint.id,
        status: 'ON_SITE',
        triageLevel: 'YELLOW',
        notes: 'This guy looks super drunk',
        transportTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gender: 'F',
        runNumber: 65433,
        barcodeValue: '9876F5E4',
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
        barcodeValue: '9876FY54',
        collectionPointId: collectionPoint.id,
        status: 'TRANSPORTED',
        triageCategory: 3,
        triageLevel: 'BLACK',
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

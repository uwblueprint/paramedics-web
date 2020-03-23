'use strict';

const db = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const event = await db.event.create({

      name: "Death Star Launch Day",
      pin: "In a galaxy far far away",
      description: "Planets will be destroyed"

    });

    const collectionPoint = await db.collectionPoint.create({
      name: "Checkpoint Tatooine",
      eventID: event.id,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return queryInterface.bulkInsert('patients', [{
      gender: 'Male',
      age: 19,
      barcodeValue: 1525242,
      collectionPointId: collectionPoint.id,
      status: 'ON_SITE',
      triageLevel: 'YELLOW',
      notes: 'This guy looks super drunk',
      transportTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      gender: 'Female',
      runNumber: 65433,
      barcodeValue: 987654,
      collectionPointId: collectionPoint.id,
      status: 'RELEASED',
      triageCategory: 1,
      triageLevel: 'GREEN',
      notes: 'needs a bandaid has green lightsaber',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      gender: 'unknown',
      age: 21,
      runNumber: 65433,
      barcodeValue: 987654,
      collectionPointId: collectionPoint.id,
      status: 'TRANSPORTED',
      triageCategory: 3,
      triageLevel: 'BLACK',
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
'use strict';

const db = require('../models');

// only for staging - won't run anywhere else
// will load 1 event, 2 ccps, x patients
// also load 2 ambulances and 2 hospitals - 1 associated and 1 not for each

module.exports = {
  up: (queryInterface) => {
    if (process.env.EB_ENVIRONMENT === 'staging') {
      // unassociated hospital + ambulance
      db.hospital.create({
        name: 'Staging Test Hospital 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      db.ambulance.create({
        vehicleNumber: 8081,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return db.event
        .create({
          eventDate: new Date(),
          name: 'Staging Test Event',
          createdBy: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then((event) => {
          // associated hospital
          db.hospital
            .create({
              name: 'Staging Test Hospital 2',
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .then((hospital) => {
              queryInterface.bulkInsert('eventHospitals', [
                {
                  eventId: event.id,
                  hospitalId: hospital.id,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ]);
            });

          // associated ambulance
          db.ambulance
            .create({
              vehicleNumber: 8082,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .then((ambulance) => {
              queryInterface.bulkInsert('eventAmbulances', [
                {
                  eventId: event.id,
                  ambulanceId: ambulance.id,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ]);
            });

          // unpopulated CCP
          db.collectionPoint.create({
            name: 'Staging Test CCP 1',
            eventId: event.id,
            createdBy: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          // populated CCP
          db.collectionPoint
            .create({
              name: 'Staging Test CCP 2',
              eventId: event.id,
              createdBy: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .then((ccp) => {
              // patients - one of each status and triage level
              //  some have transported time, run number, notes
              queryInterface.bulkInsert('patients', [
                {
                  gender: 'Male',
                  age: 19,
                  barcodeValue: 'staging1',
                  collectionPointId: ccp.id,
                  status: 'ON_SITE',
                  triageLevel: 'GREEN',
                  notes: 'Staging Test Patient Notes',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                {
                  gender: 'Female',
                  age: 20,
                  barcodeValue: 'staging2',
                  collectionPointId: ccp.id,
                  status: 'TRANSPORTED',
                  triageLevel: 'YELLOW',
                  transportTime: new Date(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                {
                  gender: 'unknown',
                  age: 21,
                  barcodeValue: 'staging3',
                  collectionPointId: ccp.id,
                  status: 'RELEASED',
                  triageLevel: 'RED',
                  notes: 'Staging Test Patient Notes',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                {
                  gender: 'Male',
                  age: 55,
                  barcodeValue: 'staging4',
                  collectionPointId: ccp.id,
                  status: 'ON_SITE',
                  triageLevel: 'WHITE',
                  notes: 'Staging Test Patient Notes',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                {
                  gender: 'Female',
                  age: 74,
                  barcodeValue: 'staging5',
                  collectionPointId: ccp.id,
                  status: 'DELETED',
                  triageLevel: 'BLACK',
                  notes: 'Staging Test Patient Notes',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                {
                  gender: 'unknown',
                  age: 15,
                  barcodeValue: 'staging6',
                  collectionPointId: ccp.id,
                  status: 'TRANSPORTED',
                  triageLevel: 'RED',
                  runNumber: 162241,
                  transportTime: new Date(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ]);
            });
        });
    }
    return Promise.resolve();
  },

  down: (queryInterface, Sequelize) => {
    if (process.env.EB_ENVIRONMENT === 'staging') {
      return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
          queryInterface.bulkDelete(
            'patients',
            {
              barcodeValue: { [Sequelize.Op.like]: 'staging%' },
            },
            { transaction: t }
          ),
          queryInterface.bulkDelete(
            'ambulances',
            {
              vehicleNumber: { [Sequelize.Op.or]: [8081, 8082] },
            },
            { transaction: t }
          ),
          queryInterface.bulkDelete(
            'hospitals',
            {
              name: { [Sequelize.Op.like]: '%Staging%' },
            },
            { transaction: t }
          ),
          queryInterface.bulkDelete(
            'collectionPoints',
            {
              name: { [Sequelize.Op.like]: '%Staging%' },
            },
            { transaction: t }
          ),
          queryInterface.bulkDelete(
            'events',
            {
              name: { [Sequelize.Op.like]: '%Staging%' },
            },
            { transaction: t }
          ),
        ]);
      });
    }
    return Promise.resolve();
  },
};

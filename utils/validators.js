'use strict';

const { AuthenticationError } = require('apollo-server');
const db = require('../models');

// for validating resolver arguments
module.exports = {
  validateUser: (userId, errorMessage = 'Invalid user ID: ' + userId) =>
    db.user.findByPk(userId).then((user) => {
      if (!user) {
        throw new Error(errorMessage);
      }
    }),
  validateEvent: (eventId, errorMessage = 'Invalid event ID: ' + eventId) =>
    db.event.findByPk(eventId).then((event) => {
      if (!event) {
        throw new Error(errorMessage);
      }
    }),
  validateCollectionPoint: (ccpId, errorMessage = 'Invalid CCP ID: ' + ccpId) =>
    db.collectionPoint.findByPk(ccpId).then((ccp) => {
      if (!ccp) {
        throw new Error(errorMessage);
      }
    }),
  validateAmbulance: (
    ambulanceId,
    errorMessage = 'Invalid ambulance ID: ' + ambulanceId
  ) =>
    db.ambulance.findByPk(ambulanceId).then((ambulance) => {
      if (!ambulance) {
        throw new Error(errorMessage);
      }
    }),
  validateHospital: (
    hospitalId,
    errorMessage = 'Invalid hospital ID: ' + hospitalId
  ) =>
    db.hospital.findByPk(hospitalId).then((hospital) => {
      if (!hospital) {
        throw new Error(errorMessage);
      }
    }),
  validatePatient: (
    patientId,
    checkParanoid = false,
    errorMessage = 'Invalid patient ID: ' + patientId
  ) => {
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }
    return db.patient.findByPk(patientId, options).then((patient) => {
      if (!patient) {
        throw new Error(errorMessage);
      }
    });
  },
  validateLocationPin: (
    locationPinId,
    checkParanoid = false,
    errorMessage = 'Invalid location pin ID: ' + locationPinId
  ) => {
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }
    return db.locationPins
      .findByPk(locationPinId, options)
      .then((locationPin) => {
        if (!locationPin) {
          throw new Error(errorMessage);
        }
      });
  },
  validateRole: (role, errorMessage = 'Insufficient permission') => {
    // TODO: remove user role when authentication is done
    const userRole =               
    {
      id: 1,
      name: 'COMMANDER',
      displayName: 'Commander',
    };

    if (!role.includes(userRole.name)) {
      throw new AuthenticationError(errorMessage);
    }
  },
};

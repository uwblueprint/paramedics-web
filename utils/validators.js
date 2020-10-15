'use strict';

const { AuthenticationError } = require('apollo-server');
const { Roles } = require('../utils/enum');
const db = require('../models');

// for validating resolver arguments
module.exports = {
  validateUser: (
    userId,
    checkParanoid = false,
    errorMessage = 'Invalid user ID: ' + userId
  ) => {
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }
    return db.user.findByPk(userId, options).then((user) => {
      if (!user) {
        throw new Error(errorMessage);
      }
    });
  },
  validateEvent: (
    eventId,
    checkParanoid = false,
    errorMessage = 'Invalid event ID: ' + eventId
  ) => {
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }
    return db.event.findByPk(eventId, options).then((event) => {
      if (!event) {
        throw new Error(errorMessage);
      }
    });
  },
  validateCollectionPoint: (
    ccpId,
    checkParanoid = false,
    errorMessage = 'Invalid CCP ID: ' + ccpId
  ) => {
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }
    return db.collectionPoint.findByPk(ccpId, options).then((ccp) => {
      if (!ccp) {
        throw new Error(errorMessage);
      }
    });
  },
  validateAmbulance: (
    ambulanceId,
    checkParanoid = false,
    errorMessage = 'Invalid ambulance ID: ' + ambulanceId
  ) => {
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }
    return db.ambulance.findByPk(ambulanceId, options).then((ambulance) => {
      if (!ambulance) {
        throw new Error(errorMessage);
      }
    });
  },
  validateHospital: (
    hospitalId,
    checkParanoid = false,
    errorMessage = 'Invalid hospital ID: ' + hospitalId
  ) => {
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }
    return db.hospital.findByPk(hospitalId, options).then((hospital) => {
      if (!hospital) {
        throw new Error(errorMessage);
      }
    });
  },
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
  validateRole: (
    role,
    userRole,
    errorMessage = 'You do not have sufficient permission to perform this action'
  ) => {
    if (!role.includes(userRole.name)) {
      throw new AuthenticationError(errorMessage);
    }
  },
  // TODO: remove user role when authentication is done
  demoRole: {
    id: 2,
    name: Roles.SUPERVISOR,
    displayName: 'Supervisor',
  },
};

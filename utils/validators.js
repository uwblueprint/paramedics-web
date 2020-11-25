'use strict';

const { AuthenticationError } = require('apollo-server-express');
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
    locationPinId = 0,
    pinType,
    ccpParentId,
    eventParentId,
    eventId,
    newPin = false,
    checkParanoid = false,
    errorMessage = 'Invalid location pin ID: ' + locationPinId
  ) => {
    console.log(pinType);
    const options = { paranoid: true };
    if (checkParanoid) {
      options.paranoid = false;
    }

    if(pinType === 'CCP') {
      if(!ccpParentId) {
        throw new Error('A CCP pin must be created by a valid CCP');
      }

      if(eventParentId) {
        throw new Error('A CCP pin cannot be created by an event');
      }
    }

    if(pinType === 'EVENT') {
      if(!eventParentId) {
        throw new Error('An event pin must be created by a valid event');
      }

      if (eventParentId !== eventId) {
        throw new Error('An event pin must be created by the same associated event');
      }
      
      if(ccpParentId) {
        throw new Error('An event pin cannot be created by a CCP');
      }
    }
    
    if(!newPin) {
      return db.locationPins
      .findByPk(locationPinId, options)
      .then((locationPin) => {
        if (!locationPin) {
          throw new Error(errorMessage);
        }
      });
    }
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
    id: 0,
    name: Roles.COMMANDER,
    displayName: 'Commander',
  },
};

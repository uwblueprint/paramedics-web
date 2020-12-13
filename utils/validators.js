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
    // if checkParanoid is TRUE, we want to turn OFF the paranoid check in sequelize options
    db.user.findByPk(userId, { paranoid: !checkParanoid }).then((user) => {
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
    db.event.findByPk(eventId, { paranoid: !checkParanoid }).then((event) => {
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
    db.collectionPoint
      .findByPk(ccpId, { paranoid: !checkParanoid })
      .then((ccp) => {
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
    db.ambulance
      .findByPk(ambulanceId, { paranoid: !checkParanoid })
      .then((ambulance) => {
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
    db.hospital
      .findByPk(hospitalId, { paranoid: !checkParanoid })
      .then((hospital) => {
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
    db.patient
      .findByPk(patientId, { paranoid: !checkParanoid })
      .then((patient) => {
        if (!patient) {
          throw new Error(errorMessage);
        }
      });
  },
  validateLocationPin: (params) => {
    if (params.args.pinType === 'CCP') {
      if (!params.args.ccpId) {
        throw new Error('A CCP pin must be created by a valid CCP');
      } else {
        db.collectionPoint
          .findByPk(params.args.ccpId, { paranoid: !params.checkParanoid })
          .then((ccp) => {
            if (!ccp) {
              throw new Error('Invalid CCP pin: ', params.args.ccpId);
            }
          });
      }
    }

    if (params.args.pinType === 'EVENT') {
      if (!params.args.eventId) {
        throw new Error('An event pin must be created by a valid event');
      }

      if (params.args.ccpId) {
        throw new Error('An event pin cannot be created by a CCP');
      }
    }

    if (params.args.pinType === 'OTHER') {
      if (params.args.ccpId) {
        throw new Error('An event pin cannot be created by a CCP');
      }
    }

    if (params.args.id) {
      db.locationPins
        .findByPk(params.args.id, { paranoid: !params.checkParanoid })
        .then((locationPin) => {
          if (!locationPin) {
            throw new Error('Invalid location pin ID: ' + params.args.id);
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

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
  // validateRole: (
  //   role, errorMessage = ` ${role} has insufficient permissions`
  // ) => {

  //   if (userRole !== role) {
  //     throw new AuthenticationError(errorMessage)
  //   }

  // }

};

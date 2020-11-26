'use strict';

const { PubSub, withFilter } = require('apollo-server-express');
const pubsub = new PubSub();
const db = require('../models');
const { Roles } = require('../utils/enum');
const validators = require('../utils/validators');

const PATIENT_ADDED = 'PATIENT_ADDED';
const PATIENT_UPDATED = 'PATIENT_UPDATED';
const PATIENT_DELETED = 'PATIENT_DELETED';
const PATIENT_RESTORED = 'PATIENT_RESTORED';

const patientResolvers = {
  Subscription: {
    patientAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([PATIENT_ADDED]),
        (payload, variables) => {
          return (
            payload.eventId ===
            parseInt(variables.eventId)
          );
        }
      ),
    },
    patientUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([PATIENT_UPDATED]),
        (payload, variables) => {
          return (
            payload.eventId ===
            parseInt(variables.eventId)
          );
        }
      ),
    },
    patientRestored: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([PATIENT_RESTORED]),
        (payload, variables) => {
          return (
            payload.eventId ===
            parseInt(variables.eventId)
          );
        }
      ),
    },
    patientDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([PATIENT_DELETED]),
        (payload, variables) => {
          return (
            payload.eventId ===
            parseInt(variables.eventId)
          );
        }
      ),
    },
  },
  Query: {
    patients: () => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.patient.findAll();
    },
    patient: (parent, args) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.patient.findByPk(args.id);
    },
    patientsByCcp: (parent, args) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      return db.patient.findAll({
        where: { collectionPointId: args.collectionPointId },
      });
    },
  },
  Patient: {
    collectionPointId: (parent) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);

      return db.collectionPoint.findByPk(parent.collectionPointId);
    },
    hospitalId: (parent) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);

      return db.hospital.findByPk(parent.hospitalId);
    },
    ambulanceId: (parent) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);

      return db.ambulance.findByPk(parent.ambulanceId);
    },
  },
  Mutation: {
    addPatient: async (parent, args) => {
      validators.validateRole(
        [Roles.COMMANDER, Roles.SUPERVISOR],
        validators.demoRole
      );
      await validators.validateCollectionPoint(args.collectionPointId);
      if (args.hospitalId) {
        await validators.validateHospital(args.hospitalId);
      }
      if (args.ambulanceId) {
        await validators.validateAmbulance(args.ambulanceId);
      }
      const newPatient = await db.patient.create({
        gender: args.gender,
        age: args.age,
        runNumber: args.runNumber,
        barcodeValue: args.barcodeValue,
        collectionPointId: args.collectionPointId,
        status: args.status,
        triageCategory: args.triageCategory,
        triageLevel: args.triageLevel,
        notes: args.notes,
        transportTime: args.transportTime,
        hospitalId: args.hospitalId,
        ambulanceId: args.ambulanceId,
      });
      const collectionPoint = await db.collectionPoint.findByPk(newPatient.collectionPointId);
      pubsub.publish(PATIENT_ADDED, { patientAdded: newPatient, eventId: collectionPoint.eventId });
      return newPatient;
    },
    updatePatient: async (parent, args) => {
      validators.validateRole(Object.values(Roles), validators.demoRole);
      await db.patient.findByPk(args.id).then((patient) => {
        if (!patient) {
          throw new Error('Invalid patient ID: ' + args.id);
        }
      });
      if (args.collectionPointId) {
        await validators.validateCollectionPoint(args.collectionPointId);
      }
      if (args.hospitalId) {
        await validators.validateHospital(args.hospitalId);
      }
      if (args.ambulanceId) {
        await validators.validateAmbulance(args.ambulanceId);
      }

      await db.patient.update(
        {
          gender: args.gender,
          age: args.age,
          runNumber: args.runNumber,
          barcodeValue: args.barcodeValue,
          collectionPointId: args.collectionPointId,
          status: args.status,
          triageCategory: args.triageCategory,
          triageLevel: args.triageLevel,
          notes: args.notes,
          transportTime: args.transportTime,
          hospitalId: args.hospitalId,
          ambulanceId: args.ambulanceId,
        },
        {
          where: {
            id: args.id,
          },
        }
      );
      const updatedPatient = await db.patient.findByPk(args.id);
      const collectionPoint = await db.collectionPoint.findByPk(updatedPatient.collectionPointId);
      pubsub.publish(PATIENT_UPDATED, { patientUpdated: updatedPatient, eventId: collectionPoint.eventId });
      return updatedPatient;
    },
    restorePatient: async (parent, args) => {
      validators.validateRole(
        [Roles.COMMANDER, Roles.SUPERVISOR],
        validators.demoRole
      );
      await validators.validatePatient(args.id, true);
      await db.patient.restore({
        where: { id: args.id },
      });
      const restoredPatient = await db.patient.findByPk(args.id);
      const collectionPoint = await db.collectionPoint.findByPk(restoredPatient.collectionPointId);
      pubsub.publish(PATIENT_RESTORED, { patientRestored: restoredPatient, eventId: collectionPoint.eventId });
      return restoredPatient;
    },
    // This is a user delete of a patient, where the status is updated. A system delete happens if a CCP with associated patients is deleted
    deletePatient: (parent, args) => {
      validators.validateRole(
        [Roles.COMMANDER, Roles.SUPERVISOR],
        validators.demoRole
      );
      return db.patient
        .update(
          {
            status: 'DELETED',
          },
          {
            where: { id: args.id },
          }
        )
        .then(async (isDeleted) => {
          if (isDeleted[0] === 1) {
            const deletedPatient = await db.patient.findByPk(args.id);
            const collectionPoint = await db.collectionPoint.findByPk(deletedPatient.collectionPointId);
            pubsub.publish(PATIENT_DELETED, { patientDeleted: deletedPatient, eventId: collectionPoint.eventId });
            return deletedPatient;
          }
          throw new Error('Deletion failed for patient ID: ' + args.id);
        });
    },
  },
};

exports.patientResolvers = patientResolvers;

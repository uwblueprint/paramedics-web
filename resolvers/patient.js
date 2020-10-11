'use strict';

const db = require('../models');
const validators = require('../utils/validators');

const patientResolvers = {
  Query: {
    patients: () => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR', 'DISPATCH']);
      return db.patient.findAll();
    },
    patient: (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR', 'DISPATCH']);
      return db.patient.findByPk(args.id);
    },
    patientsByCcp: (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR', 'DISPATCH']);
      return db.patient.findAll({
        where: { collectionPointId: args.collectionPointId },
      });
    },
  },
  Patient: {
    collectionPointId: (parent) =>
      db.collectionPoint.findByPk(parent.collectionPointId),
    hospitalId: (parent) => db.hospital.findByPk(parent.hospitalId),
    ambulanceId: (parent) => db.ambulance.findByPk(parent.ambulanceId),
  },
  Mutation: {
    addPatient: async (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR']);
      await validators.validateCollectionPoint(args.collectionPointId);
      if (args.hospitalId) {
        await validators.validateHospital(args.hospitalId);
      }
      if (args.ambulanceId) {
        await validators.validateAmbulance(args.ambulanceId);
      }

      return db.patient.create({
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
    },
    updatePatient: async (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR']);
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
      return db.patient.findByPk(args.id);
    },
    restorePatient: async (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR']);
      await validators.validatePatient(args.id, true);
      await db.patient.restore({
        where: { id: args.id },
      });
      return db.patient.findByPk(args.id);
    },
    // This is a user delete of a patient, where the status is updated. A system delete happens if a CCP with associated patients is deleted
    deletePatient: (parent, args) => {
      validators.validateRole(['COMMANDER', 'SUPERVISOR']);
      return db.patient
        .update(
          {
            status: 'DELETED',
          },
          {
            where: { id: args.id },
          }
        )
        .then((isDeleted) => {
          if (isDeleted[0] === 1) {
            return args.id;
          }
          throw new Error('Deletion failed for patient ID: ' + args.id);
        });
    },
  },
};

exports.patientResolvers = patientResolvers;

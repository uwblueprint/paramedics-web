'use strict';

const db = require('../models');

const patientResolvers = {
  Query: {
    patients: () => db.patient.findAll(),
    patient(obj, args) {
      return db.patient.findByPk(args.id);
    },
    patientsByCcp: (obj, args) =>
      db.patient.findAll({
        where: { collectionPointId: args.collectionPointId },
      }),
  },
  Patient: {
    collectionPointId: (obj) =>
      db.collectionPoint.findByPk(obj.collectionPointId),
    hospitalId: (obj) => db.hospital.findByPk(obj.hospitalId),
    ambulanceId: (obj) => db.ambulance.findByPk(obj.ambulanceId),
  },
  Mutation: {
    addPatient: async (parent, args) => {
      const collectionPoint = await db.collectionPoint.findByPk(
        args.collectionPointId
      );
      if (!collectionPoint) {
        throw new Error('Invalid collection point ID');
      }
      if (args.hospitalId) {
        const hospital = await db.hospital.findByPk(args.hospitalId);
        if (!hospital) {
          throw new Error('Invalid hospital ID');
        }
      }
      if (args.ambulanceId) {
        const ambulance = await db.ambulance.findByPk(args.ambulanceId);
        if (!ambulance) {
          throw new Error('Invalid ambulance ID');
        }
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
      const patient = await db.patient.findByPk(args.id);
      if (!patient) {
        throw new Error('Invalid patient ID');
      }
      if (args.collectionPointId) {
        const collectionPoint = await db.collectionPoint.findByPk(
          args.collectionPointId
        );
        if (!collectionPoint) {
          throw new Error('Invalid collection point ID');
        }
      }
      if (args.hospitalId) {
        const hospital = await db.hospital.findByPk(args.hospitalId);
        if (!hospital) {
          throw new Error('Invalid hospital ID');
        }
      }
      if (args.ambulanceId) {
        const ambulance = await db.ambulance.findByPk(args.ambulanceId);
        if (!ambulance) {
          throw new Error('Invalid ambulance ID');
        }
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
      await db.patient.restore({
        where: { id: args.id },
      });

      return db.patient.findByPk(args.id);
    },
    // This is a user delete of a patient, where the status is updated. A system delete happens if a CCP with associated patients is deleted
    deletePatient: async (parent, args) => {
      const isDeleted = await db.patient.update(
        {
          status: 'DELETED',
        },
        {
          where: { id: args.id },
        }
      );
      return isDeleted[0];
    },
  },
};

exports.patientResolvers = patientResolvers;

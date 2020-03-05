'use strict';

const db = require('../models');

const patientResolvers = {
    Query: {
        patients: () => db.patient.findAll(),
        patient(obj, args, context, info) {
            return db.patient.findByPk(args.id);
        },

    },
    Mutation: {
        addPatient: (parent, args) => {
            return db.patient.create({
                gender: args.gender,
                age: args.age,
                runNumber: args.runNumber,
                barcodeValue: args.barcodeValue,
                // incidentId: args.incidentId,
                status: args.status,
                triageCategory: args.triageCategory,
                triageLevel: args.triageLevel,
                notes: args.notes,
                transportTime: args.transportTime,
            });
        },
        updatePatient: async (parent, args) => {
            await db.patient.update({
                gender: args.gender,
                age: args.age,
                runNumber: args.runNumber,
                barcodeValue: args.barcodeValue,
                status: args.status,
                triageCategory: args.triageCategory,
                triageLevel: args.triageLevel,
                notes: args.notes,
                transportTime: args.transportTime,
            },
                {
                    where: {
                        id: args.id
                    }
                }
            );
            return db.patient.findByPk(args.id);
        },
        deletePatient: async (parent, args) => {
            return db.patient.destroy({
                where: { id: args.id }
            });
        },
    },
};

exports.patientResolvers = patientResolvers;

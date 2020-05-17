'use strict';

const db = require('../models');
const { AuthenticationError } = require('apollo-server');

const patientResolvers = {
    Query: {
        patients: async (obj, args, context) => {

            let hasPerms = await context.group.hasPerm(context.group.id, "read_patient");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. Patient not read.");
            }

            return db.patient.findAll();
        },
        patient(obj, args, context, info) {
            return db.patient.findByPk(args.id);
        },
    },
    Patient: {
        collectionPointId: (obj, args, context, info) => db.collectionPoint.findByPk(obj.collectionPointId)
    },
    Mutation: {
        addPatient: async (parent, args, context) => {
            let hasPerms = await context.group.hasPerm(context.group.id, "create_patient");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. Patient not created.");
            }

            const collectionPoint = await db.collectionPoint.findByPk(args.collectionPointId);
            if (!collectionPoint) {
                throw new Error("Invalid collection point ID");
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
            });
        },
        updatePatient: async (parent, args, context) => {
            let run_number_only = await context.group.hasPerm(context.group.id, "update_run_number_only");
            if (run_number_only) {
                await db.patient.update({
                    runNumber: args.runNumber
                },
                {
                    where: {
                        id: args.id
                    }
                }
                )
                return db.patient.findByPk(args.id)
            }
            let hasPerms = await context.group.hasPerm(context.group.id, "update_patient");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. Patient not updated.");
            }
            const patient = await db.patient.findByPk(args.id);
            if (!patient) {
                throw new Error("Invalid patient ID");
            }
            if (args.collectionPointId) {
                const collectionPoint = await db.collectionPoint.findByPk(args.collectionPointId);
                if (!collectionPoint) {
                    throw new Error("Invalid collection point ID");
                }
            }
            await db.patient.update({
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
            },
                {
                    where: {
                        id: args.id
                    }
                }
            );
            return db.patient.findByPk(args.id);
        },
        deletePatient: async (parent, args, context) => {

            let hasPerms = await context.group.hasPerm(context.group.id, "delete_patient");
            if (!hasPerms) {
                throw new AuthenticationError("Unauthorized. Patient not deleted.");
            }

            return db.patient.destroy({
                where: { id: args.id }
            });
        },
    },
};

exports.patientResolvers = patientResolvers;

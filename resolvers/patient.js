'use strict';

const db = require('../models');

const patientResolvers = {
    Query: {
        patients: () => db.patient.findAll(),
        patient(obj, args, context, info) {
            return db.patient.findByPk(args.id);
        },

    },
};

exports.patientResolvers = patientResolvers;

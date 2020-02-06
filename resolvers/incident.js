'use strict';

const db = require('../models');

const incidentResolvers = {
    Query: {
        incidents: () =>  db.incident.findAll(),
        incident(obj, args, context, info) {
            return db.incident.findByPk(args.id);
        },

    },
};

exports.incidentResolvers = incidentResolvers;

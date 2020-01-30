'use strict';

const db = require('../models');

const eventResolvers = {
    Query: {
        events: () =>  db.event.findAll(),
        event(obj, args, context, info) {
            return db.event.findByPk(args.id);
        },

    },
};

exports.eventResolvers =  eventResolvers;

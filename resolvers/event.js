'use strict';

const db = require('../models');

const eventResolvers = {
    Query: {
        events: () =>  db.event.findAll(),
        event: (obj, args, context, info) => db.event.findByPk(args.id),
    },
    Event: {
        createdBy: (obj, args, context, info) => db.user.findByPk(obj.createdBy),
    }
};

exports.eventResolvers =  eventResolvers;

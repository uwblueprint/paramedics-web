'use strict';

const db = require('../models');

const collectionPointResolvers = {
    Query: {
        collectionPoints: () =>  db.collectionPoint.findAll(),
        collectionPoint: (obj, args, context, info) => db.event.findByPk(args.id)
    },

    collectionPoint: {
        eventID: (obj, args, context, info) => db.event.findByPk(obj.eventID)
    },
};

exports.collectionPointResolvers = collectionPointResolvers;

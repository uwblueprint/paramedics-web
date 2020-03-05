'use strict';

const db = require('../models');

const collectionPointResolvers = {
    Query: {
        collectionPoints: () =>  db.collectionPoint.findAll(),
        collectionPoint(obj, args, context, info) {
            return db.collectionPoint.findByPk(args.id);
        },

    },
};

exports.collectionPointResolvers = collectionPointResolvers;

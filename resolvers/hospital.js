"use strict";

const db = require("../models");

const hospitalResolvers = {
  Query: {
    hospitals: () => db.hospital.findAll(),
    hospital: (obj, args, context, info) => db.hospital.findByPk(args.id)
  }
};

exports.hospitalResolvers = hospitalResolvers;

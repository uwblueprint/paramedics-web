'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface) => {
    const user = await db.user.create({
      name: 'Scary Supervisor',
      email: 'space_garbage@gmail.com',
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const event = await db.event.create({
      eventDate: new Date(),
      name: 'Spooky Scary Event',
      createdBy: user.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const collectionPoint = await db.collectionPoint.create({
      name: 'Checkpoint Coruscant',
      eventId: event.id,
      createdBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('locationPins', [
      {
        latitude: 43.470648,
        longitude: -80.535515,
        label: 'Pin 1',
        address: 'Test Address 1',
        eventId: event.id,
        pinType: 'OTHER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: 43.472431,
        longitude: -80.534667,
        label: 'Pin 2',
        address: 'Test Address 2',
        eventId: event.id,
        pinType: 'EVENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: 43.473778,
        longitude: -80.534324,
        label: 'Pin 3',
        address: 'Test Address 3',
        pinType: 'CCP',
        ccpParentId: collectionPoint.id,
        eventId: event.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('locationPins', null, {});
  },
};

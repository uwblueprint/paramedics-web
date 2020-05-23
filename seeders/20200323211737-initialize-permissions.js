'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('permissions', [
            {
                id: 1,
                name: 'Can create ambulance',
                codename: 'create_ambulance',
            },
            {
                id: 2,
                name: 'Can read ambulance',
                codename: 'read_ambulance',
            },
            {
                id: 3,
                name: 'Can update ambulance',
                codename: 'update_ambulance',
            },
            {
                id: 4,
                name: 'Can delete ambulance',
                codename: 'delete_ambulance',
            },
            {
                id: 5,
                name: 'Can create hospital',
                codename: 'create_hospital',
            },
            {
                id: 6,
                name: 'Can read hospital',
                codename: 'read_hospital',
            },
            {
                id: 7,
                name: 'Can update hospital',
                codename: 'update_hospital',
            },
            {
                id: 8,
                name: 'Can delete hospital',
                codename: 'delete_hospital',
            },
            {
                id: 9,
                name: 'Can create user',
                codename: 'create_user',
            },
            {
                id: 10,
                name: 'Can read user',
                codename: 'read_user',
            },
            {
                id: 11,
                name: 'Can delete user',
                codename: 'delete_user',
            },
            {
                id: 12,
                name: 'Can create patient',
                codename: 'create_patient',
            },
            {
                id: 13,
                name: 'Can read patient',
                codename: 'read_patient',
            },
            {
                id: 14,
                name: 'Can update patient',
                codename: 'update_patient',
            },
            {
                id: 15,
                name: 'Can delete patient',
                codename: 'delete_patient',
            },
            {
                id: 16,
                name: 'Can create event',
                codename: 'create_event',
            },
            {
                id: 17,
                name: 'Can read event',
                codename: 'read_event',
            },
            {
                id: 18,
                name: 'Can update event',
                codename: 'update_event',
            },
            {
                id: 19,
                name: 'Can delete event',
                codename: 'delete_event',
            },
            {
                id: 20,
                name: "Can only update patients run number",
                codename: "update_run_number_only",
            },
            {
                id: 21,
                name: 'Can create collection point',
                codename: 'create_collection_point',
            },
            {
                id: 22,
                name: 'Can read collection point',
                codename: 'read_collection_point',
            },
            {
                id: 23,
                name: 'Can update collection point',
                codename: 'update_collection_point',
            },
            {
                id: 24,
                name: 'Can delete collection point',
                codename: 'delete_collection_point',
            },
            
            ], {});
    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.bulkDelete('permissions', null, {});
    }
};

'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('permissions', [
            {
                name: 'Can add event',
                codename: 'add_event',
            },
            {
                name: 'Can change event',
                codename: 'change_event',
            },
            {
                name: 'Can find event',
                codename: 'find_event',
            },
            {
                name: 'Can delete event',
                codename: 'delete_event',
            },
            {
                name: 'Can add incident',
                codename: 'add_incident',
            },
            {
                name: 'Can change incident',
                codename: 'change_incident',
            },
            {
                name: 'Can find incident',
                codename: 'find_incident',
            },
            {
                name: 'Can delete incident',
                codename: 'delete_incident',
            },
            {
                name: 'Can add patient',
                codename: 'add_patient',
            },
            {
                name: 'Can change patient',
                codename: 'change_patient',
            },
            {
                name: 'Can find patient',
                codename: 'find_patient',
            },
            {
                name: 'Can delete patient',
                codename: 'delete_patient',
            },
            {
                name: 'Can add patient',
                codename: 'add_patient',
            },
            {
                name: 'Can change patient',
                codename: 'change_patient',
            },
            {
                name: 'Can find patient',
                codename: 'find_patient',
            },
            {
                name: 'Can delete patient',
                codename: 'delete_patient',
            },
            ], {});
    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.bulkDelete('permissions', null, {});
    }
};

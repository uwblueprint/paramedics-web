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
                name: 'Can view event',
                codename: 'view_event',
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
                name: 'Can view incident',
                codename: 'view_incident',
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
                name: 'Can view patient',
                codename: 'view_patient',
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

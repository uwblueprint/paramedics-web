'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('groupPermissions', [
           // Ambulancess
            {
                groupId: 1,
                permissionId: 1,
            },
            {
                groupId: 1,
                permissionId: 2,
            },
            {
                groupId: 1,
                permissionId: 3,
            },
            {
                groupId: 1,
                permissionId: 4,
            },
            
            // Hospitals
            {
              groupId: 1,
              permissionId: 5,
            },
            {
              groupId: 1,
              permissionId: 6,
            },
            {
              groupId: 1,
              permissionId: 7,
            },
            {
              groupId: 1,
              permissionId: 8,
            },

          // Users
          {
            groupId: 1,
            permissionId: 9,
          },
          {
            groupId: 1,
            permissionId: 10,
          },
          {
            groupId: 1,
            permissionId: 11,
          },
          
          // Patients
          {
            groupId: 1,
            permissionId: 12,
          },
          {
            groupId: 1,
            permissionId: 13,
          },
          {
            groupId: 1,
            permissionId: 14,
          },
          {
            groupId: 1,
            permissionId: 15,
          },
          {
            groupId: 2,
            permissionId: 13,
          },
          {
            groupId: 2,
            permissionId: 14,
          },
          {
            groupId: 3,
            permissionId: 13,
          },
          {
            groupId: 3,
            permissionId: 14,
          },
          {
            groupId: 3,
            permissionId: 20,
          },
          
          // Events
          {
            groupId: 1,
            permissionId: 16,
          },
          {
            groupId: 1,
            permissionId: 17,
          },
          {
            groupId: 1,
            permissionId: 18,
          },
          {
            groupId: 1,
            permissionId: 19,
          },
        ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('groupPermissions', null, {});
  }
};

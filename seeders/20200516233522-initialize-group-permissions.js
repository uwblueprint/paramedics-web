'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('groupPermissions', [

// Permission IDs go from create -> read -> update -> delete
// if the group lack the permission it will still follow the above order but without the missing permission

// Ambulances

          // Commander
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

          // Supervisor
          {
            groupId: 2,
            permissionId: 1,
          },

// Hospitals

          // Commander
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

          // Supervisor
          {
            groupId: 2,
            permissionId: 5,
          },


// Users

          // Commander
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
            permissionId: 12,
          },

          // Supervisor
          {
            groupId: 2,
            permissionId: 10,
          },

          // Dispatch
          {
            groupId: 3,
            permissionId: 10,
          },
          
// Patients

          // Commander 
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

          // Supervisor 
          {
            groupId: 2,
            permissionId: 13,
          },
          {
            groupId: 2,
            permissionId: 14,
          },
          {
            groupId: 2,
            permissionId: 15,
          },

          // Dispatch
          {
            groupId: 3,
            permissionId: 14,
          },

          // Dispatch: Editing Run Number
          {
            
            groupId: 3,
            permissionId: 21,
          },
          
// Events

          // Commander
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
          {
            groupId: 1,
            permissionId: 20,
          },

          // Supervisor
          {
            groupId: 2,
            permissionId: 17,
          },

          // Dispatch
          {
            groupId: 3,
            permissionId: 17,
          },

// Collection Points

          // Commander
          {
            groupId: 1,
            permissionId: 22, 

          },
          {
            groupId: 1,
            permissionId: 23, 

          },
          {
            groupId: 1,
            permissionId: 24, 

          },
          {
            groupId: 1,
            permissionId: 25, 

          },

          // Supervisor
          {
            groupId: 2,
            permissionId: 22, 

          },
          {
            groupId: 2,
            permissionId: 23, 

          },

          // Dispatch
          {
            groupId: 3,
            permissionId: 23, 
          },
          

        ], {});
    },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('groupPermissions', null, {});
  }
};

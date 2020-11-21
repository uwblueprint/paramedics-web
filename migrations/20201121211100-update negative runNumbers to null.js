'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkUpdate(
      'patients',
      { runNumber: null },
      { runNumber: '-1' }
    );
  },
  down: () => {
    return Promise.resolve();
  },
};

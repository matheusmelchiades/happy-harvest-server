const harvests = require('./data/harvests.json');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('harvests', harvests, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('harvests', null, {});
    }
};

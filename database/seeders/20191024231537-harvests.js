const harvests = require('../data/harvests.json');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`ALTER SEQUENCE harvests_id_seq RESTART WITH ${harvests.length + 1}`);

        return queryInterface.bulkInsert('harvests', harvests);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('harvests', null);
    }
};

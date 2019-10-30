const tabLists = require('../data/tablists.json');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`ALTER SEQUENCE tablist_id_seq RESTART WITH ${tabLists.length + 1}`);

        return queryInterface.bulkInsert('tablist', tabLists);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tablist', null);
    }
};

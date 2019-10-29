const farms = require('../data/farms.json');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`ALTER SEQUENCE farms_id_seq RESTART WITH ${farms.length + 1}`);

        return queryInterface.bulkInsert('farms', farms);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('farms', null);
    }
};

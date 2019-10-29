const mills = require('../data/mills.json');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`ALTER SEQUENCE mills_id_seq RESTART WITH ${mills.length + 1}`);

        return queryInterface.bulkInsert('mills', mills);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mills', null);
    }
};

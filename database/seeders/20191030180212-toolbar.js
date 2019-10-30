const toolbars = require('../data/toolbars.json');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`ALTER SEQUENCE toolbar_id_seq RESTART WITH ${toolbars.length + 1}`);

        return queryInterface.bulkInsert('toolbar', toolbars);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('toolbar', null);
    }
};

const fields = require('../data/fields.json');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`ALTER SEQUENCE fields_id_seq RESTART WITH ${fields.length + 1}`);

        return queryInterface.bulkInsert('fields', fields);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('fields', null);
    }
};

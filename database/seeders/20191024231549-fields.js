const fields = require('../data/fields.json');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('fields', fields);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('fields', null);
    }
};

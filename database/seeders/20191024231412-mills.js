const mills = require('../data/mills.json');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mills', mills);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mills', null);
    }
};

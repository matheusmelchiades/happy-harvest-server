const farms = require('./data/farms.json');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('farms', farms, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('farms', null, {});
    }
};

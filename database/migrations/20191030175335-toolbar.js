const TABLE_NAME = 'toolbar';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            field: {
                type: Sequelize.STRING
            },
            icon: {
                type: Sequelize.STRING
            },
            path: {
                type: Sequelize.STRING
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(TABLE_NAME);
    }
};

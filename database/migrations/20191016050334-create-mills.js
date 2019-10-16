const TABLE_NAME = 'mills';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable(TABLE_NAME);
    }
};

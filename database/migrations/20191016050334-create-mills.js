const TABLE_NAME = 'mills';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable(TABLE_NAME);
    }
};

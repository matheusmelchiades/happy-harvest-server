const TABLE_NAME = 'farms';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(TABLE_NAME, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            harvestId: {
                type: Sequelize.INTEGER
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable(TABLE_NAME);
    }
};

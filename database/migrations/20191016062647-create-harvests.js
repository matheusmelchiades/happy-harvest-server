const TABLE_NAME = 'harvests';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            startDate: {
                type: Sequelize.DATE
            },
            endDate: {
                type: Sequelize.DATE
            },
            millId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'mills',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(TABLE_NAME);
    }
};

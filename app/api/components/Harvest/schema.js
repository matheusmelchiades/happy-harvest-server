const DataTypes = global.database.dataTypes;

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    millId: DataTypes.INTEGER
};

const options = {
    tableName: 'harvests'
};

module.exports = { schema, options };

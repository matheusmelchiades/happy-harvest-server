const DataTypes = global.database.dataTypes;

const TABLE_NAME = 'FARMS';

exports = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: DataTypes.STRING,
    harvestId: DataTypes.INTEGER
};

exports.options = {
    tableName: TABLE_NAME
};

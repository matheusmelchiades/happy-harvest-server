const DataTypes = global.database.dataTypes;

const TABLE_NAME = 'FIELDS';

exports = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    farmId: DataTypes.INTEGER
};

exports.options = {
    tableName: TABLE_NAME
};

const DataTypes = global.database.dataTypes;

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    farmId: DataTypes.INTEGER
};

const options = {
    tableName: 'fields'
};

module.exports = { schema, options };

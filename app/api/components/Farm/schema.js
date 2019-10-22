const DataTypes = global.database.dataTypes;

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    harvestId: DataTypes.INTEGER
};

const options = {
    tableName: 'farms'
};

module.exports = { schema, options };

const DataTypes = global.database.dataTypes;

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    label: DataTypes.STRING,
    path: DataTypes.STRING
};

const options = {
    tableName: 'tablist'
};

module.exports = { schema, options };

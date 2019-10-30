const DataTypes = global.database.dataTypes;

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    field: {
        type: DataTypes.STRING
    },
    icon: {
        type: DataTypes.STRING
    },
    path: {
        type: DataTypes.STRING
    }
};

const options = {
    tableName: 'toolbar'
};

module.exports = { schema, options };

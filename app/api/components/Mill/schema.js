const DataTypes = global.database.dataTypes;

const schema = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

const options = {
    tableName: 'mills'
};

module.exports = { schema, options };

const DataTypes = global.database.dataTypes;

const TABLE_NAME = 'MILLS';

exports = {
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

exports.options = {
    tableName: TABLE_NAME,
    raw: false
};

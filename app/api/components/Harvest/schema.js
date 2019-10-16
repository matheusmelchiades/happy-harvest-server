const DataTypes = global.database.dataTypes;

const TABLE_NAME = 'HARVESTS';

exports = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    millId: DataTypes.INTEGER
};

exports.options = {
    tableName: TABLE_NAME
};

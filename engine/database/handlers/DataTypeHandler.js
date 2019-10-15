const { DataTypes } = require('sequelize');

DataTypes.STRING.prototype.toSql = function() {
    if (!this._binary) {
        return 'VARCHAR(' + this._length + ')';
    } else {
        return 'BINARY(' + this._length + ')';
    }
};

DataTypes.DATE.prototype._stringify = function(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

module.exports = DataTypes;

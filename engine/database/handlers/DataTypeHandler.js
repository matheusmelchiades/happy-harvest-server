const { DataTypes } = require('sequelize');

DataTypes.DATE.prototype._stringify = function(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

module.exports = DataTypes;

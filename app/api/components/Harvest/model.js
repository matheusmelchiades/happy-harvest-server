const db = global.database;
const { schema, options } = require('./schema');
const model = db.model('harvest', schema, options);

module.exports = model;

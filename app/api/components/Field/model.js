const db = global.database;
const { schema, options } = require('./schema');
const model = db.model('field', schema, options);

module.exports = model;

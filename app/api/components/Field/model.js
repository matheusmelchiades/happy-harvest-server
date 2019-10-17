const db = global.database;
const { schema, options } = require('./schema');
const model = db.defineModel('field', schema, options);

module.exports = model;

const db = global.database;
const { schema, options } = require('./schema');
const model = db.defineModel('harvest', schema, options);

module.exports = model;

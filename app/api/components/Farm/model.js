const db = global.database;
const { schema, options } = require('./schema');
const model = db.defineModel('farm', schema, options);

module.exports = model;

const db = global.database;
const { schema, options } = require('./schema');

const model = db.defineModel('mill', schema, options);

module.exports = model;

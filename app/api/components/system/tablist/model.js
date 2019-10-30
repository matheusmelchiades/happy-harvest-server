const db = global.database;
const { schema, options } = require('./schema');

const model = db.defineModel('tablist', schema, options);

module.exports = model;

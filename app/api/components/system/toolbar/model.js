const db = global.database;
const { schema, options } = require('./schema');

const model = db.defineModel('toolbar', schema, options);

module.exports = model;

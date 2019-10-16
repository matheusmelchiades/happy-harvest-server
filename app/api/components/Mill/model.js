const db = global.database;
const { schema, options } = require('./schema');

const model = db.model('mill', schema, options);

module.exports = model;

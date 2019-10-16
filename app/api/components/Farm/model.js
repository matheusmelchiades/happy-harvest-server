const db = global.database;
const { schema, options } = require('./schema');
const model = db.model('farm', schema, options);

module.exports = model;

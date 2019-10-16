const db = global.database;
const schema = require('./schema');
const model = db.model('mill', schema, schema.options);

const projection = ['id', 'name'];

module.exports = model;
module.exports.projection = projection;

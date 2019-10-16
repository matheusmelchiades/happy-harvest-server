const db = global.database;
const schema = require('./schema');
const model = db.model('field', schema, schema.options);

const projection = ['id', 'latitude', 'longitude', 'farmId'];

module.exports = model;
module.exports.projection = projection;

const db = global.database;
const schema = require('./schema');
const model = db.model('harvest', schema, schema.options);

const projection = ['id', 'startDate', 'endDate', 'millId'];

module.exports = model;
module.exports.projection = projection;

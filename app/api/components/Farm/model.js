const db = global.database;
const schema = require('./schema');
const model = db.model('farm', schema, schema.options);

const projection = ['id', 'name', 'harvestId'];

module.exports = model;
module.exports.projection = projection;

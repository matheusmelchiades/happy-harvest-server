module.exports.missingField = field => `The field '${field}' is missing`;

module.exports.create = objectName => `couldn't create a new '${objectName}'`;

module.exports.emptyValue = (...fields) => `The ${fields.map(field => `'${field}'`).join()} not allow empty string`;

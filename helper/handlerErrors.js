module.exports.invalidParam = (...fields) =>
    `The ${fields.length ? fields.map(field => `'${field}'`).join() : 'params'} has invalid value`;

module.exports.errorRouter = (message, route = {}) =>
    `======================================\n` +
    `==  ${message}\n` +
    `==  ${JSON.stringify(route)}` +
    `======================================`;

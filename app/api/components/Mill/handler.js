const model = require('./model');
const errors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

module.exports.create = async (req, res) => {
    try {
        const millDb = await model.create(req.body);

        return res.json(millDb);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(errors.create('mill'));
    }
};

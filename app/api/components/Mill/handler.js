const model = require('./model');
const errors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

module.exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.boom.notAcceptable(errors.missingField('name'));
        if (!name.trim()) return res.boom.badData(errors.emptyValue('name'));

        const millDb = await model.create({ name });

        return res.json(millDb);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(errors.create('mill'));
    }
};

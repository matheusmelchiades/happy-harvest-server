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

module.exports.search = async (req, res) => {
    try {
        const { search } = req.query;

        const millDb = await model.searchMill(search);

        return res.json(millDb);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation('deu ruim aqui');
    }
};

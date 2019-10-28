const model = require('./model');
const factory = require('./factory');
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

module.exports.getListing = async (req, res) => {
    try {
        const { page = 0, rowsPerPage = 5 } = req.query;

        const millsDb = await model.findAndCountAll({
            limit: rowsPerPage,
            offset: page * rowsPerPage
        });

        return res.json(factory.listing(millsDb));
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation('deu ruim aqui');
    }
};

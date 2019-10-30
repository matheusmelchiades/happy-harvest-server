const model = require('./model');
const factory = require('../factory');
const modelMill = require('../Mill/model');
const handlerErrors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

module.exports.create = async (req, res) => {
    try {
        const { millId, ...harvest } = req.body;

        const millDb = await modelMill.findOne({ where: { id: millId } });

        if (!millDb) return res.boom.badData(`The mill with id ${millId} not exists`);

        const harvestDb = await model.create({ millId, ...harvest });

        return res.json({ message: 'Harvest created with success!', data: harvestDb });
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(handlerErrors.create('harvest'));
    }
};

module.exports.getListing = async (req, res) => {
    try {
        const { page = 0, rowsPerPage = 5 } = req.query;

        const harvestsDB = await model.findAndCountAll({
            limit: rowsPerPage,
            offset: page * rowsPerPage
        });

        return res.json(factory.listing(harvestsDB));
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation('deu ruim aqui');
    }
};

module.exports.getHarvestByMillId = async (req, res) => {
    try {
        const { millId } = req.params;

        const harvestsDb = await model.getHarvestByMillId(millId);

        return res.json(harvestsDb);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation('deu ruim aqui');
    }
};

const model = require('./model');
const modelMill = require('../Mill/model');
const handlerErrors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

exports.create = async (req, res) => {
    try {
        const { millId, ...harvest } = req.body;

        const millDb = await modelMill.findOne({ where: { id: millId } });

        if (!millDb) return res.boom.badData(`The mill with id ${millId} not exists`);

        const harvestDb = await model.create({ millId, ...harvest });

        return res.json(harvestDb);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(handlerErrors.create('harvest'));
    }
};

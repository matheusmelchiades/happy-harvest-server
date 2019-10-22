const model = require('./model');
const modelHarvest = require('../Harvest/model');
const handlerErrors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

exports.create = async (req, res) => {
    try {
        const { harvestId, ...farm } = req.body;

        const harvestDb = await modelHarvest.findOne({ where: { id: harvestId } });

        if (!harvestDb) return res.boom.badData(`The harvest with id ${harvestId} not exists`);

        const farmDb = await model.create({ ...farm, harvestId });

        return res.json(farmDb);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(handlerErrors.create('farm'));
    }
};

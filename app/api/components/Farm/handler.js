const model = require('./model');
const factory = require('../factory');
const modelHarvest = require('../Harvest/model');
const handlerErrors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

exports.create = async (req, res) => {
    try {
        const { harvestId, ...farm } = req.body;

        const harvestDb = await modelHarvest.findOne({ where: { id: harvestId } });

        if (!harvestDb) return res.boom.badData(`The harvest with id ${harvestId} not exists`);

        const farmDb = await model.create({ ...farm, harvestId });

        return res.json({ message: 'Farm created with success!', data: farmDb });
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(handlerErrors.create('farm'));
    }
};

module.exports.getListing = async (req, res) => {
    try {
        const { page = 0, rowsPerPage = 5 } = req.query;

        const farmsDb = await model.findAndCountAll({
            limit: rowsPerPage,
            offset: page * rowsPerPage
        });

        return res.json(factory.listing(farmsDb));
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation();
    }
};

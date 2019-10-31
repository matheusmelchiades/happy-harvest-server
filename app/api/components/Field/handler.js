const model = require('./model');
const factory = require('../factory');
const modelFarm = require('../Farm/model');
const handlerErrors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

exports.create = async (req, res) => {
    try {
        const { farmId, ...field } = req.body;

        const farmDb = await modelFarm.findOne({ where: { id: farmId } });

        if (!farmDb) return res.boom.badData(`The Farm with id ${farmId} not exists`);

        const fieldDb = await model.create({ ...field, farmId });

        return res.json({ message: 'Harvest created with success!', data: fieldDb });
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(handlerErrors.create('field'));
    }
};

module.exports.getListing = async (req, res) => {
    try {
        const { page = 0, rowsPerPage = 5 } = req.query;

        const fieldDb = await model.findAndCountAll({
            limit: rowsPerPage,
            offset: page * rowsPerPage
        });

        return res.json(factory.listing(fieldDb));
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation();
    }
};

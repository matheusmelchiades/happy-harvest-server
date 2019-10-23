const model = require('./model');
const modelFarm = require('../Farm/model');
const handlerErrors = require('../../../../helper/handlerErrors');
const logger = require('../../../../engine/logger')();

exports.create = async (req, res) => {
    try {
        const { farmId, ...field } = req.body;

        const farmDb = await modelFarm.findOne({ where: { id: farmId } });

        if (!farmDb) return res.boom.badData(`The field with id ${farmId} not exists`);

        const fieldDb = await model.create({ ...field, farmId });

        return res.json(fieldDb);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation(handlerErrors.create('field'));
    }
};

const logger = require('../../../../engine/logger')();
const model = require('./model');

module.exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.boom.notAcceptable('Invalid request, The field "name" is missing');

        const mills = await model.create({ name });

        if (!mills) return res.boom.badRequest('Error, could not created');

        return res.send(mills);
    } catch (err) {
        logger.error(`#### ERROR :: ${err.message} :: ####`);
        return res.boom.badRequest(err.message);
    }
};

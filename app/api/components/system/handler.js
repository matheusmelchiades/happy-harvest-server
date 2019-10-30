const modelToolbar = require('./toolbar/model');
const modelTablist = require('./tablist/model');

const logger = require('../../../../engine/logger')();

module.exports.getToolbar = async (req, res) => {
    try {
        const toolbars = await modelToolbar.findAll();

        return res.json(toolbars);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation();
    }
};

module.exports.getTablist = async (req, res) => {
    try {
        const tablists = await modelTablist.findAll();

        return res.json(tablists);
    } catch (err) {
        logger.error(err);

        return res.boom.badImplementation();
    }
};

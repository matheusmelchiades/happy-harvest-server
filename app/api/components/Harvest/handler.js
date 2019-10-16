const model = require('./model');

exports.findAll = async (req, res) => {
    const harvests = await model.findAll({ attributes: model.projection });

    return res.send(harvests);
};

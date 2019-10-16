const model = require('./model');

exports.findAll = async (req, res) => {
    const fields = await model.findAll({ attributes: model.projection });

    return res.send(fields);
};

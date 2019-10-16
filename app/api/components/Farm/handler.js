const model = require('./model');

exports.findAll = async (req, res) => {
    const farms = await model.findAll({ attributes: model.projection });

    return res.send(farms);
};

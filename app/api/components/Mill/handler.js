const model = require('./model');

exports.findAll = async (req, res) => {
    const mills = await model.findAll({ attributes: model.projection });

    return res.send(mills);
};

const model = require('./model');

exports.findAll = async (req, res) => {
    const mills = await model.findAll();

    return res.send(mills);
};

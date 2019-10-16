const model = require('./model');

exports.findAll = async (req, res) => {
    const farms = await model.findAll();

    return res.send(farms);
};

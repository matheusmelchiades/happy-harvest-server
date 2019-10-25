const db = global.database;
const { schema, options } = require('./schema');

const model = db.defineModel('mill', schema, options);
model.searchMill = (search = '', field = 'name') => {
    return model.findAll({
        where: {
            [field]: {
                [db.operator.like]: `%${search}%`
            }
        }
    });
};

module.exports = model;

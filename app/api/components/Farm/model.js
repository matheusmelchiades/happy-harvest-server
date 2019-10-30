const db = global.database;
const { schema, options } = require('./schema');
const model = db.defineModel('farm', schema, options);

model.searchFarm = ({ search = '', field = 'name', limit = 30 }) => {
    return model.findAll({
        limit,
        where: {
            [field]: {
                [db.operator.like]: `%${search}%`
            }
        }
    });
};

module.exports = model;

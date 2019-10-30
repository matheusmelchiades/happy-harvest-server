const db = global.database;
const { schema, options } = require('./schema');
const model = db.defineModel('harvest', schema, options);

model.getHarvestByMillId = millId => {
    if (millId < 0) return [];

    return model.findAll({
        where: {
            millId
        }
    });
};

model.getHarvestByDate = ({ startDate = '', endDate = '' }) => {
    return model.findAll({
        where: {
            startDate: {
                [db.operator.between]: [startDate, endDate]
            },
            endDate: {
                [db.operator.between]: [startDate, endDate]
            }
        }
    });
};

module.exports = model;

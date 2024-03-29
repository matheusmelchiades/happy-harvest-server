const db = global.database;
const { schema, options } = require('./schema');

/**
 *  MODELS
 */
const model = db.defineModel('mill', schema, options);
const modelHarvests = require('../Harvest/model');

/**
 * Associations
 */
model.hasMany(modelHarvests, { foreignKey: 'millId', as: 'harvests' });

/**
 * CUSTOM FUNCTIONS
 */
model.searchMill = ({ search = '', field = 'name', limit = 30 }) => {
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

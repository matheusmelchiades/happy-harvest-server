const faker = require('faker');
const { factory } = require('factory-girl');

/**
 * MODELS
 */
const millModel = require('../app/api/components/Mill/model');
const harvestModel = require('../app/api/components/Harvest/model');
const farmModel = require('../app/api/components/Farm/model');
const fieldmodel = require('../app/api/components/Field/model');

/**
 * Factory MILL
 */
factory.define('mill', millModel, {
    id: faker.random.number(),
    name: faker.name.firstName()
});

/**
 * Factory HARVEST
 */
factory.define('harvest', harvestModel, {
    id: faker.random.number(),
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.future().toISOString(),
    millId: faker.random.number()
});

/**
 * Factory FARM
 */
factory.define('farm', farmModel, {
    id: faker.random.number(),
    name: faker.name.firstName(),
    harvestId: faker.random.number()
});

/**
 * Factory FIELD
 */
factory.define('field', fieldmodel, {
    id: faker.random.number(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    farmId: faker.random.number()
});

module.exports = factory;

const faker = require('faker');
const { factory } = require('factory-girl');

/**
 * MODELS
 */
const millModel = require('../app/api/components/Mill/model');
const harvestModel = require('../app/api/components/Harvest/model');
const farmModel = require('../app/api/components/Farm/model');
const fieldModel = require('../app/api/components/Field/model');
const toolbarModel = require('../app/api/components/system/toolbar/model');
const tablistModel = require('../app/api/components/system/tablist/model');

/**
 * Factory MILL
 */
factory.define('mill', millModel, {
    name: faker.name.firstName()
});

/**
 * Factory HARVEST
 */
factory.define('harvest', harvestModel, {
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.future().toISOString(),
    millId: faker.random.number()
});

/**
 * Factory FARM
 */
factory.define('farm', farmModel, {
    name: faker.name.firstName(),
    harvestId: faker.random.number()
});

/**
 * Factory FIELD
 */
factory.define('field', fieldModel, {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    farmId: faker.random.number()
});

/**
 * Factory TOOLBARS
 */
factory.define('toolbar', toolbarModel, {
    field: faker.lorem.word(),
    icon: faker.lorem.word(),
    path: `/${faker.lorem.word()}`
});

/**
 * Factory TABLIST
 */
factory.define('tablist', tablistModel, {
    label: faker.lorem.word(),
    path: `/${faker.lorem.word()}`
});

module.exports = factory;

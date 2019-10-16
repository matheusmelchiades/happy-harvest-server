const database = require('../engine/database/dbfactory');

describe('First Test', () => {
    let factory;

    beforeAll(async () => {
        await database.createConnection();

        factory = require('./factory');
    });

    it('It should pass test', async () => {
        const test = await factory.create('mill');

        expect(test).not.toBeNull();
    });
});

const request = require('supertest');
const database = require('../../engine/database/dbfactory');

describe('Sytem', () => {
    let app;
    let factory;

    beforeAll(async () => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
        factory = require('../factory');
    });

    describe('Toolbar', () => {
        it('It should return all fields of toolbar', async () => {
            await factory.createMany('toolbar', 10);

            const response = await request(app).get('/system/toolbar');

            expect(response.status).toBe(200);
            expect(response.body);
        });
    });

    describe('Tablist', () => {
        it('It should return all fields of tablist', async () => {
            await factory.createMany('tablist', 10);

            const response = await request(app).get('/system/tablist');

            expect(response.status).toBe(200);
            expect(response.body);
        });
    });
});

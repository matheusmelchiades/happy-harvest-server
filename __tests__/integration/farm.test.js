const request = require('supertest');
const database = require('../../engine/database/dbfactory');

describe('Farm', () => {
    let app;
    let factory;

    beforeAll(async next => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
        factory = require('../factory');

        await global.database.truncate();

        next();
    });

    it('It should create farm with sucess', async () => {
        const millDb = await factory.create('mill');
        const harvestDb = await factory.create('harvest', { millId: millDb.id });
        const farm = {
            name: 'test name farm',
            harvestId: harvestDb.id
        };

        const response = await request(app)
            .post('/farm')
            .send(farm);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
    });

    it('It should receive error if request have name invalid ', async () => {
        const millDb = await factory.create('mill');
        const harvestDb = await factory.create('harvest', { millId: millDb.id });
        const farm = {
            name: '', // empty
            harvestId: harvestDb.id
        };

        const response = await request(app)
            .post('/farm')
            .send(farm);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('name');
        });
    });

    it('It should receive error if request have harvestId invalid ', async () => {
        const farm = {
            name: 'test name farm',
            harvestId: 'HARVEST INVALID'
        };

        const response = await request(app)
            .post('/farm')
            .send(farm);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('harvestId');
        });
    });

    it('It should receive error if harvest not exists', async () => {
        const farm = {
            name: 'Farm test',
            harvestId: 999
        };

        const response = await request(app)
            .post('/farm')
            .send(farm);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
    });
});

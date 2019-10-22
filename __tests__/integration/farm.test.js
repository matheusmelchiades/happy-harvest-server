const request = require('supertest');
const database = require('../../engine/database/dbfactory');

describe('Farm', () => {
    let app;
    let factory;

    beforeAll(async () => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
        factory = require('../factory');
        await global.database.truncate();
    });

    it('It should create farm with sucess', async () => {
        const farm = {
            name: 'test name farm',
            harvestId: 1
        };

        await factory.create('harvest', { id: farm.harvestId });

        const response = await request(app)
            .post('/farm')
            .send(farm);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('It should receive error if request have invalid ', async () => {
        const farm = {
            name: '', // empty
            harvestId: 1
        };

        await factory.create('harvest', { id: farm.harvestId });

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

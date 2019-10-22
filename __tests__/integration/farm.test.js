const request = require('supertest');
const database = require('../../engine/database/dbfactory');

describe('Farm', () => {
    let app;
    let factory;

    beforeAll(async () => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
        factory = require('../factory');
    });

    it('It should create farm with sucess', async () => {
        const harvestDb = await factory.create('harvest');

        const response = await request(app)
            .post('/farm')
            .send({
                name: 'test name farm',
                harvestId: harvestDb.id
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('It should receive error if request have name invalid ', async () => {
        const harvestDb = await factory.create('harvest');

        const response = await request(app)
            .post('/farm')
            .send({
                name: '',
                harvestId: harvestDb.id
            });

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

const request = require('supertest');
const database = require('../../engine/database/dbfactory');
const handlerErrors = require('../../helper/handlerErrors');

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

    it('It should return data of Listing', async () => {
        const farmDb = await factory.createMany('farm', 5);
        const params = { page: 0, rowsPerPage: 5 };

        const response = await request(app)
            .get('/farm/listing')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('headers');
        expect(response.body).toHaveProperty('rows');
        expect(response.body.count).toBeGreaterThanOrEqual(farmDb.length);
        expect(response.body.rows.length).toBe(farmDb.length);
        response.body.headers.map(header => {
            expect(header).toHaveProperty('name');
            expect(header).toHaveProperty('type');
        });
    });

    it('It should receive error if send query request invalid', async () => {
        const params = { INVALID_PAGE: 0, INVALID_ROWS_PER_PAGE: 5 };

        const response = await request(app)
            .get('/farm/listing')
            .query(params);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(handlerErrors.invalidParam());
    });

    it('It should return data with input search by params request', async () => {
        const farmDb = await factory.create('farm', { name: 'testingSearch' });
        const params = { search: 'testingSearch' };

        const response = await request(app)
            .get('/farm')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name).toBe(farmDb.name);
    });
});

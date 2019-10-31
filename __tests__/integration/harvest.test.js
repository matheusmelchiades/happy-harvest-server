const request = require('supertest');
const database = require('../../engine/database/dbfactory');
const handlerErrors = require('../../helper/handlerErrors');

describe('Harvest', () => {
    let app;
    let factory;

    beforeAll(async () => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
        factory = require('../factory');
    });

    beforeEach(async () => {
        await global.database.truncate();
    });

    it('It should create harvest with sucess', async () => {
        const millDb = await factory.create('mill');
        const harvest = {
            startDate: '2019-01-01T02:00:00.000Z',
            endDate: '2019-06-01T03:00:00.000Z',
            millId: millDb.id
        };

        const response = await request(app)
            .post('/harvest')
            .send(harvest);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
    });

    it('It should receive error if request have invalid startDate', async () => {
        const harvest = {
            startDate: '01/01/2019',
            endDate: '2019-06-01T03:00:00.000Z',
            millId: 1
        };

        const response = await request(app)
            .post('/harvest')
            .send(harvest);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('startDate');
        });
    });

    it('It should receive error if request have invalid endDate', async () => {
        const harvest = {
            startDate: '2019-06-01T03:00:00.000Z',
            endDate: '01/01/2019',
            millId: 1
        };

        const response = await request(app)
            .post('/harvest')
            .send(harvest);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('endDate');
        });
    });

    it('It should receive error if request have invalid millId', async () => {
        const harvest = {
            startDate: '2019-06-01T03:00:00.000Z',
            endDate: '2019-06-01T03:00:00.000Z',
            millId: 'INVALID MILLID'
        };

        const response = await request(app)
            .post('/harvest')
            .send(harvest);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('millId');
        });
    });

    it('It should receive error if mill not exists', async () => {
        const harvest = {
            startDate: '2019-06-01T03:00:00.000Z',
            endDate: '2019-06-01T03:00:00.000Z',
            millId: 999
        };

        const response = await request(app)
            .post('/harvest')
            .send(harvest);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
    });

    it('It should return projection of harvest Listing', async () => {
        const params = { page: 0, rowsPerPage: 5 };

        const response = await request(app)
            .get('/harvest/listing')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('headers');
        expect(response.body).toHaveProperty('rows');
    });

    it('It should return data of harvest Listing', async () => {
        const harvestDb = await factory.createMany('harvest', 5);
        const params = { page: 0, rowsPerPage: 5 };

        const response = await request(app)
            .get('/harvest/listing')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('headers');
        expect(response.body).toHaveProperty('rows');
        expect(response.body.count).toBeGreaterThanOrEqual(harvestDb.length);
        expect(response.body.rows.length).toBe(harvestDb.length);
        response.body.headers.map(header => {
            expect(header).toHaveProperty('name');
            expect(header).toHaveProperty('type');
        });
    });

    it('It should receive error if send query request invalid', async () => {
        const params = { INVALID_PAGE: 0, INVALID_ROWS_PER_PAGE: 5 };

        const response = await request(app)
            .get('/harvest/listing')
            .query(params);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(handlerErrors.invalidParam());
    });
});

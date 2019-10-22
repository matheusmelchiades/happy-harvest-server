const request = require('supertest');
const database = require('../../engine/database/dbfactory');

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
        const harvest = {
            startDate: '2019-01-01T02:00:00.000Z',
            endDate: '2019-06-01T03:00:00.000Z',
            millId: 1
        };

        await factory.create('mill', { id: harvest.millId });

        const response = await request(app)
            .post('/harvest')
            .send(harvest);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
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
});

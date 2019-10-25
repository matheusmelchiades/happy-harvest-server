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

    it('It should create field with sucess', async () => {
        const millDb = await factory.create('mill');
        const harvestDb = await factory.create('harvest', { millId: millDb.id });
        const farmDb = await factory.create('farm', { harvestId: harvestDb.id });
        const field = {
            latitude: 212.12112,
            longitude: -12.112352,
            farmId: farmDb.id
        };

        const response = await request(app)
            .post('/field')
            .send(field);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('It should receive error if request have invalid latitude', async () => {
        const field = {
            latitude: 'INVALID LATITUDE',
            longitude: -12.112352,
            farmId: 1
        };

        const response = await request(app)
            .post('/field')
            .send(field);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('latitude');
        });
    });

    it('It should receive error if request have invalid longitude', async () => {
        const field = {
            latitude: -12.112352,
            longitude: 'INVALID LONGITUDE',
            farmId: 1
        };

        const response = await request(app)
            .post('/field')
            .send(field);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('longitude');
        });
    });

    it('It should receive error if request have invalid farmId', async () => {
        const field = {
            latitude: -12.112352,
            longitude: 129.12,
            farmId: 'INVALID FARM ID'
        };

        const response = await request(app)
            .post('/field')
            .send(field);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');

        response.body.errors.map(error => {
            expect(error).toHaveProperty('param');
            expect(error.param).toBe('farmId');
        });
    });

    it('It should receive error if farm not exists', async () => {
        const field = {
            latitude: -12.112352,
            longitude: -1223.09871,
            farmId: 999
        };

        const response = await request(app)
            .post('/field')
            .send(field);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
    });
});

const request = require('supertest');
const database = require('../../engine/database/dbfactory');

describe('Field', () => {
    let app;
    let factory;

    beforeAll(async () => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
        factory = require('../factory');
    });

    it('It should create field with success', async () => {
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
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
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

    it('It should return data of Field Listing', async () => {
        const fieldsDb = await factory.createMany('field', 5);
        const params = { page: 0, rowsPerPage: 5 };

        const response = await request(app)
            .get('/field/listing')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('headers');
        expect(response.body).toHaveProperty('rows');
        expect(response.body.count).toBeGreaterThanOrEqual(fieldsDb.length);
        expect(response.body.rows.length).toBe(fieldsDb.length);
        response.body.headers.map(header => {
            expect(header).toHaveProperty('name');
            expect(header).toHaveProperty('type');
        });
    });
});

const request = require('supertest');
const database = require('../../engine/database/dbfactory');
const handlerErrors = require('../../helper/handlerErrors');

describe('Mill', () => {
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

    it('It should create mill with sucess', async () => {
        const mill = { name: 'MILL TEST' };

        const response = await request(app)
            .post('/mill')
            .send(mill);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
    });

    it('It should on create receive id of mill created', async () => {
        const mill = { name: 'MILL TEST' };

        const response = await request(app)
            .post('/mill')
            .send(mill);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('name');
    });

    it('It should receive error if send request invalid', async () => {
        const mill = { fieldInvalid: 'MILL TEST' };

        const response = await request(app)
            .post('/mill')
            .send(mill);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(handlerErrors.invalidParam());
    });

    it('It should return projection of mill Listing', async () => {
        const params = { page: 0, rowsPerPage: 5 };

        const response = await request(app)
            .get('/mill/listing')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('headers');
        expect(response.body).toHaveProperty('rows');
    });

    it('It should return data of Listing', async () => {
        const millsDb = await factory.createMany('mill', 5);
        const params = { page: 0, rowsPerPage: 5 };

        const response = await request(app)
            .get('/mill/listing')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('headers');
        expect(response.body).toHaveProperty('rows');
        expect(response.body.count).toBeGreaterThanOrEqual(millsDb.length);
        expect(response.body.rows.length).toBe(millsDb.length);
        response.body.headers.map(header => {
            expect(header).toHaveProperty('name');
            expect(header).toHaveProperty('type');
        });
    });

    it('It should receive error if send query request invalid', async () => {
        const params = { INVALID_PAGE: 0, INVALID_ROWS_PER_PAGE: 5 };

        const response = await request(app)
            .get('/mill/listing')
            .query(params);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(handlerErrors.invalidParam());
    });

    it('It should return data with input search by params request', async () => {
        const millDb = await factory.create('mill', { name: 'testingSearch' });
        const params = { search: 'testingSearch' };

        const response = await request(app)
            .get('/mill')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name).toBe(millDb.name);
    });
});

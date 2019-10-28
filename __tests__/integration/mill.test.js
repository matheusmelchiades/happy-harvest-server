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
    });

    it('It should on create receive id of mill created', async () => {
        const mill = { name: 'MILL TEST' };

        const response = await request(app)
            .post('/mill')
            .send(mill);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
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

    it('It should return projection of Listing', async () => {
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
        const millDb = await factory.createMany('mill', 5);
        const params = { page: 0, rowsPerPage: 5 };

        const response = await request(app)
            .get('/mill/listing')
            .query(params);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('headers');
        expect(response.body).toHaveProperty('rows');
        expect(response.body.count).toBe(millDb.length);
        expect(response.body.headers).toEqual(expect.arrayContaining(['id', 'name']));
        expect(response.body.rows.length).toBe(millDb.length);
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
});

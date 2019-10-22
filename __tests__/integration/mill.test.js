const request = require('supertest');
const database = require('../../engine/database/dbfactory');
const handlerErrors = require('../../helper/handlerErrors');

describe('Mill', () => {
    let app;

    beforeAll(async () => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
    });

    afterEach(async () => {
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
});

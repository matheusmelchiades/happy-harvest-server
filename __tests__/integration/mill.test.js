const request = require('supertest');
const database = require('../../engine/database/dbfactory');

describe('Mill', () => {
    let app;

    beforeAll(async () => {
        await database.createConnection();

        app = require('../../engine/launcher').initalize();
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

    it("It should receive error if couln't send request valid", async () => {
        const mill = { fieldInvalid: 'MILL TEST' };

        const response = await request(app)
            .post('/mill')
            .send(mill);

        expect(response.status).toBe(406);
    });
});

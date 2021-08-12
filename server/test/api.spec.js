const request = require('supertest');
const server = require('../server');

describe('API endpoints', () => {
    let api;
    beforeAll(() => {
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll(done => {
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to /', done => {
        request(api).get('/').expect(200, done);
    });

    it('responds to GET /posts', done => {
        request(api).get('/posts').expect(200, done);
    });

    it('responds to non existing paths with 404', done => {
        request(api).get('/no').expect(404, done);
    });
});

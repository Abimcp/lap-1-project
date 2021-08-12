const request = require('supertest');
const server = require('../server');

describe('API endpoints', () => {
    let api;

    let testPost = {
        message: 'Liberty and Kaz should win Love Island 2021',
        timestamp: 'test',
        gif: 'test'
    };

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

    it('responds to POST /posts with status 201', done => {
        request(api)
            .post('/posts')
            .send(testPost)
            .set('Accept', /application\/json/)
            .expect(201)
            .expect({ ...testPost }, done);
    });

    it('responds to GET /:id', done => {
        request(api).get('/posts/:id').expect(200, done);
    });

    it('responds to GET /:id/comments', done => {
        request(api).get('/posts/:id/comments').expect(200, done);
    });

    it('responds to non existing paths with 404', done => {
        request(api).get('/non').expect(404, done);
    });

    it('responds to invalid method request with 405', done => {
        request(api).post('/').expect(405, done);
    });
});

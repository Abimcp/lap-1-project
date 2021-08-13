const supertest = require('supertest');
const server = require('../app');

const request = supertest(server);

const testPost = { message: 'Hello world', timestamp: new Date() };

describe('API endpoints', () => {
    // let api;

    // beforeAll(() => {
    //     api = server.listen(5000, () =>
    //         console.log('Test server running on port 5000')
    //     );
    // });

    // afterAll(done => {
    //     console.log('Gracefully stopping test server');
    //     api.close(done);
    // });
    // it('responds to /', done => {
    //     request(api).get('/').expect(200, done);
    // });
    // it('responds to GET /posts', done => {
    //     request(api).get('/posts').expect(200, done);
    // });
    // it('responds to non existing paths with 404', done => {
    //     request(api).get('/no').expect(404, done);
    // });

    it('should return some posts', async () => {
        const { status, body } = await request.get('/posts');
        expect(status).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(1);
    });

    it('should return some posts', async () => {
        const { status, body } = await request.get('/posts/1628778265656/comments');
        expect(status).toBe(200);
        expect(body[0].message).toContain('testing that this works the way that');
    });

    // it('should create a new post', async () => {
    //     const { status, body } = await request.post('/posts').send(testPost);
    //     expect(status).toBe(201);
    // });
});

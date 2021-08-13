const supertest = require('supertest');
const server = require('../app');

const request = supertest(server);

const testPost = { message: 'Hello world', timestamp: new Date() };

describe('API endpoints', () => {
    it('should return some posts', async () => {
        const { status, body } = await request.get('/posts');
        expect(status).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(1);
    });

    it('should return some comments for post "1628778265656" ', async () => {
        const { status, body } = await request.get('/posts/1628778265656/comments');
        expect(status).toBe(200);
        expect(body[0].message).toBeTruthy();
    });

    it('should create a new post', async () => {
        const { status, body } = await request.post('/posts').send(testPost);
        expect(status).toBe(201);
        expect(body.message).toBe(testPost.message);
    });

    it('should create a new comment for post "1628778265656"', async () => {
        const { status, body } = await request
            .post('/posts/1628778265656/comments')
            .send(testPost);
        expect(status).toBe(201);
        expect(body.message).toBe(testPost.message);
    });

    it('should increase like count for post "1628778265656"', async () => {
        const { status, body } = await request
            .post('/posts/1628778265656/reactions')
            .send({ like: 'like' });
        expect(status).toBe(200);
        expect(body.message).toBe('Reaction count has been updated');
    });
});

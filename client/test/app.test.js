/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock');
let app;

describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../scripts/api.js');
    });

    afterEach(() => {
        fetch.resetMocks();
    });

    describe('requests', () => {
        describe('getAllPosts', () => {
            test('it makes a get request to /posts', () => {
                app.getAllPosts();
                // expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/cats$/))
                expect(fetch.mock.calls[0][0]).toMatch(/posts$/);
            });
        });

        describe('submitPost', () => {
            test('it makes a post request to /posts with the post data', () => {
                const fakePost = {
                    preventDefault: jest.fn(),
                    target: {
                        message: { value: 'Welcome to Love Island Reacts' },
                        timestamp: { vaue: 'test' },
                        gif: { value: 'null' }
                    }
                };

                app.postEntry(fakePost);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body');
            });
        });
    });
});

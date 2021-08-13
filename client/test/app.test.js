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
                // expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/posts$/))
                expect(fetch.mock.calls[0][0]).toMatch(/posts$/);
            });
        });

        describe('getComments', () => {
            test('it makes a get request to /posts/:id/comments', () => {
                app.getComments();
                // expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/comments$/))
                expect(fetch.mock.calls[0][0]).toMatch(/comments$/);
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

        describe('submitReaction', () => {
            test('it makes a post request to /posts/id/reactions with the post data', () => {
                const id = 1;
                const fakeReaction = {
                    target: {
                        like: 'like'
                    }
                };

                app.postReactionCount(id, fakeReaction);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body');
            });
        });

        describe('appendPost', () => {
            test('it renders a new div on the page with the post data', () => {
                const individualPost = document.querySelectorAll('div').length;
                app.appendPost({
                    message: 'Hello World',
                    timestamp: 'today',
                    gif: 'null',
                    comments: []
                });
                const newDivCount = document.querySelectorAll('div').length;
                // expect(newDivCount).toEqual(individualPost + 1);
                expect(
                    document.querySelector('#posts-container').textContent
                ).toContain('Hello World');
            });
        });

        describe('appendComment', () => {
            test('it renders a new div on the page with the comment data', () => {
                const commentContainer = document.querySelectorAll('div').length;
                app.appendComment({
                    message: 'Big fan of this!'
                });
                const newDivCount = document.querySelectorAll('div').length;
                expect(newDivCount).toEqual(commentContainer + 1);
                expect(
                    document.querySelector('.reply__results').textContent
                ).toContain('Big fan of this!');
            });
        });
    });
});

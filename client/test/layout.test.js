/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('head');
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('Buzzer');
        });

        describe('body', () => {
            test('it has a header', () => {
                let header = document.querySelector('header');
                expect(document.querySelector('header')).toBeTruthy();
                expect(header.textContent).toContain('Love Island Reacts');
            });

            describe('Post Form', () => {
                test('it exists', () => {
                    let postForm = document.querySelector('.post__actions');
                    expect(postForm).toBeTruthy();
                });

                test('it has a button for submitting a post', () => {
                    let postBtn = document.querySelector('.post__btn');
                    expect(postBtn).toBeTruthy();
                    expect(postBtn.textContent).toContain('Post');
                });
            });

            describe('Giphy Search Form', () => {
                test('it exists', () => {
                    let gifForm = document.querySelector('.giphy-search__form');
                    expect(gifForm).toBeTruthy();
                });

                test('it has a section to display gifs', () => {
                    expect(
                        document.querySelector('.giphy-search__results')
                    ).toBeTruthy();
                });
            });
        });
    });
});

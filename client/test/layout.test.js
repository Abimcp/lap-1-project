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
            expect(head.textContent).toContain('Love Island Reacts');
        });

        test('there is a favicon', () => {
            const head = document.querySelector('head');
            expect(head.innerHTML).toContain('link rel="icon"');
        });

        test('there is a css stylesheet', () => {
            const head = document.querySelector('head');
            expect(head.innerHTML).toContain('link rel="stylesheet"');
        });

        describe('body', () => {
            test('it has a header', () => {
                let header = document.querySelector('header');
                expect('header').toBeTruthy();
                expect(header.textContent).toContain('Love Island Reacts');
            });
            test('it has a section to display posts', () => {
                expect(document.querySelector('#posts__container')).toBeTruthy;
            });
            test('it has a section to display replies', () => {
                expect(document.querySelector('#reply__container')).toBeTruthy;
            });

            describe('Post Form', () => {
                test('it exists', () => {
                    let postForm = document.querySelector('.post__actions');
                    expect(postForm).toBeTruthy();
                });

                test('it has a button for submitting a post', () => {
                    let postBtn = document.querySelector('.post__btn');
                    expect(postBtn).toBeTruthy();
                    expect(postBtn.getAttribute('type')).toBe('submit');
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

            describe('footer', () => {
                test('it exists', () => {
                    let footer = document.querySelector('footer');
                    expect(footer).toBeTruthy();
                });

                test('it contains the names of contributors', () => {
                    let footer = document.querySelector('footer');
                    expect(footer.textContent).toContain(
                        '©Elicia, Tobi, Corneliu & Abi'
                    );
                });
            });
        });
    });
});

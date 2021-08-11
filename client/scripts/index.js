const {
    updateCharacterCount,
    handleGifSearch,
    enablePostButton
} = require('./helpers');

const postText = document.querySelector('.post__text');
const searchbar = document.querySelector('.giphy-search__container input');
const postBtn = document.querySelector('.post__btn');

postText.addEventListener('keyup', updateCharacterCount);
postText.addEventListener('keydown', enablePostButton);
searchbar.addEventListener('keydown', handleGifSearch);
postBtn.addEventListener('click', () =>
    postEntry({ message: 'Hi', timestamp: new Date() })
);

enablePostButton();

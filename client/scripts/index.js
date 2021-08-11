const {
    updateCharacterCount,
    handleGifSearch,
    enablePostButton
} = require('./helpers');

const postText = document.querySelector('.post__text');
const searchbar = document.querySelector('.giphy-search__container input');

postText.addEventListener('keyup', updateCharacterCount);
postText.addEventListener('keydown', enablePostButton);
searchbar.addEventListener('keydown', handleGifSearch);

enablePostButton();

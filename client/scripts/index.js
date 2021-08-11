const {
    updateCharacterCount,
    handleGifSearch,
    enablePostButton,
    addSelectedGifToPost
} = require('./helpers');

const postText = document.querySelector('.post__text');
const searchbar = document.querySelector('.giphy-search__container input');

const gifImageContainer = document.querySelector('.giphy-search__results');
const postButton = document.querySelector('.post__btn');

postText.addEventListener('keydown', enablePostButton);
postText.addEventListener('keyup', updateCharacterCount);
postButton.addEventListener('click', postEntry);
searchbar.addEventListener('keydown', handleGifSearch);

gifImageContainer.addEventListener('click', addSelectedGifToPost);

enablePostButton();

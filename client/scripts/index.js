const {
    updateCharacterCount,
    handleGifSearch,
    enablePostButton,
    addSelectedGifToPost
} = require('./helpers');

const { postEntry, getAllPosts } = require('./api');

const postText = document.querySelector('.post__text');
const postButton = document.querySelector('.post__btn');
const searchbar = document.querySelector('.giphy-search__container input');
const gifImageContainer = document.querySelector('.giphy-search__results');

postText.addEventListener('keyup', enablePostButton);
postText.addEventListener('keydown', enablePostButton);
postText.addEventListener('keydown', updateCharacterCount);
postButton.addEventListener('click', postEntry);
searchbar.addEventListener('keydown', handleGifSearch);
gifImageContainer.addEventListener('click', addSelectedGifToPost);

enablePostButton();
getAllPosts();

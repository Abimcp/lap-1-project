const { updateCharacterCount, handleGifSearch } = require('./helpers');

const postText = document.querySelector('.post__text');
const searchbar = document.querySelector('.giphy-search__container input');

postText.addEventListener('keyup', updateCharacterCount);
searchbar.addEventListener('keydown', handleGifSearch);

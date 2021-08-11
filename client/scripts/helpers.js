const { fetchGiphy } = require('./giphy');

const updateCharacterCount = () => {
    const currentCount = document.querySelector('.current-count');
    const postText = document.querySelector('.post__text');
    const replyText = document.querySelector('.reply__text');

    if (postText.value.length === 280 || replyText.value.length === 280) {
        alert('You have reached the maximum amount of characters');
    }

    currentCount.textContent = postText.value.length;
};

const handleGifSearch = event => {
    if (event.key === 'Enter') {
        fetchGiphy();
    }
};

module.exports = { updateCharacterCount, handleGifSearch };

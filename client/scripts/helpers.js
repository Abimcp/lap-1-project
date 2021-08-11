const { fetchGiphy } = require('./giphy');

const postText = document.querySelector('.post__text');
// const replyText = document.querySelector('.reply__text');
const postButton = document.querySelector('.post__btn');

const updateCharacterCount = () => {
    const currentCount = document.querySelector('.current-count');

    if (postText.value.length === 280) {
        alert('You have reached the maximum amount of characters');
    }

    currentCount.textContent = postText.value.length;
};

const enablePostButton = () => {
    if (!postText.value.length) {
        postButton.style.backgroundColor = '#959595';
        postButton.style.cursor = 'not-allowed';
    } else {
        postButton.style.backgroundColor = '#56d8e5cc';
        postButton.style.cursor = 'pointer';
    }
};

const handleGifSearch = event => {
    if (event.key === 'Enter') {
        fetchGiphy();
    }
};

module.exports = { updateCharacterCount, enablePostButton, handleGifSearch };

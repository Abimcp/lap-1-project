const updateCharacterCount = () => {
    const currentCount = document.querySelector('.current-count');
    const postText = document.querySelector('.post__text');

    if (postText.value.length === 280) {
        alert('You have reached the maximum amount of characters');
    }

    currentCount.textContent = postText.value.length;
};

// fetchGifs(query)

// createImageFromGif(gif)

// addGifsToDocument()

const handleGifSearch = event => {
    if (event.key === 'Enter') {
        // addGifsToDocument()
    }
};

module.exports = { updateCharacterCount, handleGifSearch };

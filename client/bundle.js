(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const apiKey = 'dc6zaTOxFJmzC';
let results = document.querySelector('.giphy-search__results');

function fetchGiphy() {
    results.innerHTML = '';
    let str = document.querySelector('#gif-search-bar').value.trim();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${str}`;
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            let img = document.createElement('img');
            img.src = json.data[0].images.fixed_height_downsampled.url;
            img.style.cursor = 'pointer';
            results.appendChild(img);
            document.querySelector('#gif-search-bar').value = '';
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = { fetchGiphy };

},{}],2:[function(require,module,exports){
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
    event.preventDefault();
    if (event.key === 'Enter') {
        fetchGiphy();
    }
};

const addSelectedGifToPost = event => {
    event.preventDefault();

    const postContent = document.querySelector('.post__content');
    const gifSearchModal = document.querySelector('.giphy-search');
    const gifImage = document.querySelector('.giphy-search__results img');

    if (gifImage) {
        gifImage.style.height = '200px';
        gifImage.style.objectFit = 'contain';
        postContent.appendChild(gifImage);
        gifSearchModal.style.visibility = 'hidden';
    }
};

module.exports = {
    updateCharacterCount,
    enablePostButton,
    handleGifSearch,
    addSelectedGifToPost
};

},{"./giphy":1}],3:[function(require,module,exports){
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

},{"./helpers":2}]},{},[3]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const { updateCharacterCount, handleGifSearch } = require('./helpers');

const postText = document.querySelector('.post__text');
const searchbar = document.querySelector('.giphy-search__container input');

postText.addEventListener('keyup', updateCharacterCount);
searchbar.addEventListener('keydown', handleGifSearch);

},{"./helpers":1}]},{},[2]);

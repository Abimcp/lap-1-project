(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const postEntry = event => {
    event.preventDefault();
    const postText = document.querySelector('.post__text').value;
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify({
            message: postText,
            timestamp: new Date(),
            gif: document.querySelector('.post__content img')
                ? document.querySelector('.post__content img').src
                : null
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        // removes the #giphy_search from url
        .then(window.location.replace(window.location.href.split('#')[0]))
        .catch(error => (error, 'Error catching entry'));
};

function createReactions(data) {
    const heartBtn = document.createElement('button');
    const thumbBtn = document.createElement('button');
    const clapBtn = document.createElement('button');
    const replyBtn = document.createElement('button');
    const aTag = document.createElement('a');
    const heartSpan = document.createElement('span');
    const thumbSpan = document.createElement('span');
    const clapSpan = document.createElement('span');
    const replySpan = document.createElement('span');
    const reactions = document.createElement('div');

    heartSpan.setAttribute('id', 'outputheart');
    thumbSpan.setAttribute('id', 'outputthumb');
    clapSpan.setAttribute('id', 'outputclap');
    replySpan.setAttribute('id', 'outputreply');

    heartSpan.innerHTML = data.like;
    thumbSpan.innerHTML = data.thumbsUp;
    clapSpan.innerHTML = data.clap;
    replySpan.innerHTML = data.comments.length;

    heartBtn.setAttribute('class', 'reaction__btn');
    heartBtn.setAttribute('id', 'heart__btn');
    heartBtn.textContent = '💖';
    heartBtn.appendChild(heartSpan);

    thumbBtn.setAttribute('class', 'reaction__btn');
    thumbBtn.setAttribute('id', 'thumb__btn');
    thumbBtn.textContent = '👍';
    thumbBtn.appendChild(thumbSpan);

    clapBtn.setAttribute('class', 'reaction__btn');
    clapBtn.setAttribute('id', 'clap__btn');
    clapBtn.textContent = '👏';
    clapBtn.appendChild(clapSpan);

    aTag.setAttribute('href', '#reply-search');
    aTag.textContent = '💬';

    replyBtn.setAttribute('class', 'reaction__btn');
    replyBtn.setAttribute('id', 'reply__btn');
    replyBtn.appendChild(aTag);
    replyBtn.appendChild(replySpan);

    reactions.setAttribute('class', 'reactions');
    reactions.appendChild(heartBtn);
    reactions.appendChild(thumbBtn);
    reactions.appendChild(clapBtn);
    reactions.appendChild(replyBtn);

    return reactions;
}

function createPost(data) {
    const postContainer = document.createElement('div');
    const entries = document.createElement('p');
    const gif = document.createElement('img');
    const timestamp = document.createElement('p');

    entries.setAttribute('class', 'message');
    timestamp.setAttribute('class', 'timestamp');

    entries.textContent = data.message;
    entries.contentEditable = 'true';
    timestamp.textContent = data.fromNow;
    gif.src = data.gif || '';

    postContainer.appendChild(entries);
    postContainer.appendChild(timestamp);
    postContainer.appendChild(gif);
    return postContainer;
}

function appendPost(data) {
    const post = createPost(data);
    const reactions = createReactions(data);

    const individualPost = document.createElement('div');
    individualPost.setAttribute('class', 'individual-post');
    individualPost.appendChild(post);
    individualPost.appendChild(reactions);

    const postsContainer = document.querySelector('#posts-container');
    postsContainer.appendChild(individualPost);
}

const getAllPosts = () => {
    fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(data => {
            data.map(post => {
                appendPost(post);
            });
        })
        .catch(error => error, 'Error catching entry');
};

module.exports = { postEntry, getAllPosts };

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./giphy":2}],4:[function(require,module,exports){
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

},{"./api":1,"./helpers":3}]},{},[4]);

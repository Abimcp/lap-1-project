const moment = require('moment');

const postEntry = event => {
    event.preventDefault();
    const postText = document.querySelector('.post__text').value;
    fetch('https://island-reactions.herokuapp.com/posts', {
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
        .catch(error => console.log(error, 'Error posting entry'));
};

const postReactionCount = (id, reaction) => {
    fetch(`https://island-reactions.herokuapp.com/posts/${id}/reactions`, {
        method: 'POST',
        body: JSON.stringify({
            reaction: reaction
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log('count data ', data))
        .catch(error => console.log('Error incrementing count ', error));
};

const postComment = id => {
    const comment = document.querySelector('.reply-search__text').value;
    fetch(`https://island-reactions.herokuapp.com/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            message: comment,
            timestamp: new Date()
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log('data ', data));
};

const getComments = id => {
    fetch(`https://island-reactions.herokuapp.com/posts/${id}/comments`)
        .then(res => res.json())
        .then(data =>
            data.map(comment => {
                appendComment(comment);
            })
        )
        .catch(error => console.log('Error fetching comments ', error.message));
};

const getAllPosts = () => {
    fetch('https://island-reactions.herokuapp.com/posts')
        .then(res => res.json())
        .then(data => {
            data.map(post => {
                appendPost(post);
                individualPost = post;
            });
        })
        .catch(error => console.log('Error getting all posts ', error));
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

    let currentLikeCount = data.like;
    let currentThumbsUpCount = data.thumbsUp;
    let currentClapCount = data.clap;

    heartSpan.setAttribute('id', 'outputheart');
    thumbSpan.setAttribute('id', 'outputthumb');
    clapSpan.setAttribute('id', 'outputclap');
    replySpan.setAttribute('id', 'outputreply');

    heartSpan.innerHTML = currentLikeCount;
    thumbSpan.innerHTML = currentThumbsUpCount;
    clapSpan.innerHTML = currentClapCount;
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

    replyBtn.setAttribute('class', 'reaction__btn');
    replyBtn.setAttribute('id', 'reply__btn');

    aTag.setAttribute('href', '#reply-search');
    aTag.textContent = '💬';
    aTag.appendChild(replySpan);
    replyBtn.appendChild(aTag);

    reactions.setAttribute('class', 'reactions');
    reactions.appendChild(heartBtn);
    reactions.appendChild(thumbBtn);
    reactions.appendChild(clapBtn);
    reactions.appendChild(replyBtn);

    heartBtn.addEventListener('click', () => {
        heartSpan.innerHTML = ++currentLikeCount;
        postReactionCount(data.id, 'like');
    });

    thumbBtn.addEventListener('click', () => {
        thumbSpan.innerHTML = ++currentThumbsUpCount;
        postReactionCount(data.id, 'thumbsUp');
    });

    clapBtn.addEventListener('click', () => {
        clapSpan.innerHTML = ++currentClapCount;
        postReactionCount(data.id, 'clap');
    });

    aTag.addEventListener('click', () => getComments(data.id));

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
    entries.style.outline = 'transparent';
    timestamp.textContent = moment(data.timestamp).fromNow();
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

function appendComment(data) {
    const replyResultsContainer = document.querySelector('.reply__results');
    const commentContainer = document.createElement('div');
    const comment = document.createElement('p');
    const timestamp = document.createElement('p');

    commentContainer.setAttribute('class', 'comment__container');
    timestamp.setAttribute('class', 'comment__timestamp');

    comment.textContent = data.message;
    timestamp.textContent = moment(data.timestamp).fromNow();

    commentContainer.appendChild(timestamp);
    commentContainer.appendChild(comment);
    replyResultsContainer.appendChild(commentContainer);
}

module.exports = { postEntry, getAllPosts, appendPost };

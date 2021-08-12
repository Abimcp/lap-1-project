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
        .catch(error => console.log(error, 'Error catching entry'));
};

const postReactionCount = (id, reaction) => {
    fetch(`http://localhost:3000/posts/${id}/reactions`, {
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

    heartBtn.addEventListener('click', () => postReactionCount(data.id, 'like'));
    thumbBtn.addEventListener('click', () => postReactionCount(data.id, 'thumbsUp'));
    clapBtn.addEventListener('click', () => postReactionCount(data.id, 'clap'));

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

module.exports = { postEntry, getAllPosts };

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

function appendReactions() {
    const heartBtn = document.createElement('button');
    const thumbBtn = document.createElement('button');
    const clapBtn = document.createElement('button');
    const replyBtn = document.createElement('button');
    const aTag = document.createElement('a');
    const reactions = document.createElement('div');

    heartBtn.setAttribute('class', 'reaction__btn');
    heartBtn.setAttribute('id', 'heart__btn');
    heartBtn.textContent = '💖';

    thumbBtn.setAttribute('class', 'reaction__btn');
    thumbBtn.setAttribute('id', 'thumb__btn');
    thumbBtn.textContent = '👍';

    clapBtn.setAttribute('class', 'reaction__btn');
    clapBtn.setAttribute('id', 'clap__btn');
    clapBtn.textContent = '👏';

    aTag.setAttribute('href', '#reply-search');
    aTag.textContent = '💬';

    replyBtn.setAttribute('class', 'reaction__btn');
    replyBtn.setAttribute('id', 'reply__btn');
    replyBtn.appendChild(aTag);

    reactions.style.marginBottom = '150px';
    reactions.setAttribute('class', 'reactions');
    reactions.appendChild(heartBtn);
    reactions.appendChild(thumbBtn);
    reactions.appendChild(clapBtn);
    reactions.appendChild(replyBtn);

    const postsContainer = document.querySelector('#posts-container');
    postsContainer.append(reactions);
}

// function appendPosts(posts) {
//     posts.forEach(appendPost);
// }

function appendPost(data) {
    const post = document.createElement('div');
    const entries = document.createElement('p');
    entries.textContent = data.message;
    const gif = document.createElement('img');
    data.gif ? (gif.src = data.gif) : null;

    post.appendChild(entries);
    post.appendChild(gif);
    const postsContainer = document.querySelector('#posts-container');
    // postsContainer.insertBefore(post, postsContainer.firstChild);
    postsContainer.appendChild(post);
}

const getAllPosts = () => {
    fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(data => {
            data.map(post => {
                appendPost(post);
                appendReactions();
                console.log(post, 'Posts data');
            });
        })
        .catch(error => error, 'Error catching entry');
};

module.exports = { postEntry, getAllPosts };

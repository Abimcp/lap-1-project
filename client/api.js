const postEntry = event => {
    event.preventDefault();
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify({ message: 'Hi', timestamp: new Date() }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => appendPost(data))
        .catch(error => (error, 'Error catching entry'));
};

function appendPosts(posts) {
    posts.forEach(appendPost);
}

function appendPost(data) {
    const post = document.createElement('div');
    const entries = document.createElement('p');
    entries.textContent = data.messages;
    const gif = document.createElement('img');
    post.append(entries);
    const postsContainer = document.querySelector('#posts-container');
    postsContainer.insertBefore(post, postsContainer.firstChild);
}

const getAllPosts = () => {
    fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(data => appendPosts(data))
        .catch(error => (error, 'Error catching entry'));
};

module.exports = postEntry;

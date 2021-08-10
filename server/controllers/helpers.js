const fs = require('fs');

const writeToJson = data => {
    fs.writeFile('data.json', JSON.stringify(data, null, 4), error => {
        if (error) {
            console.log('Error saving post data to JSON file', error);
        }
        console.log('JSON data saved successfully');
    });
};

/**
 * @param {object} newPost an object that represents the properties in the 'Post' model.
 */
const addNewPost = newPost => {
    fs.readFile('data.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Error reading data from "data.json"', error);
        }

        const posts = JSON.parse(data);
        const updatedPosts = [newPost, ...posts];
        writeToJson(updatedPosts);
    });
};

/**
 * @param {object} comment an object that represents the properties of the 'Comment' model.
 */
const addCommentToPost = (postId, comment) => {
    fs.readFile('data.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Error reading data from "user.json"', error);
        }

        const posts = JSON.parse(data);
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                post.comments.unshift(comment);
            }

            return posts;
        });

        writeToJson(...updatedPosts);
    });
};

/**
 * @param {string} reaction the emoji sent as a string.
 */
const addReactionToPost = (postId, reaction) => {
    fs.readFile('data.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Error reading data from "user.json"', error);
        }

        const posts = JSON.parse(data);
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                if (reaction === 'like') {
                    post.like++;
                } else if (reaction === 'thumbsUp') {
                    post.thumbsUp++;
                } else if (reaction === 'clap') {
                    post.clap++;
                }
            }

            return posts;
        });

        writeToJson(...updatedPosts);
    });
};

module.exports = { addNewPost, addCommentToPost, addReactionToPost };

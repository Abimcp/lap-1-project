const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { addNewPost, addCommentToPost, addReactionToPost } = require('./helpers');

const fs = require('fs');

//get route for all posts /posts

router.get('/', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file from disk:', err);
            return;
        }
        try {
            const posts = JSON.parse(data);
            res.json(posts);
        } catch (err) {
            console.log('Error parsing JSON string:', err);
        }
    });
});

// //put route for updating emojis /posts/:id

router.post('/:id/reactions', (req, res) => {
    const id = parseInt(req.params.id);
    const reaction = req.body;
    const key = Object.keys(reaction);
    addReactionToPost(id, reaction[key]);
    res.status(200).json({ message: `Reaction count has been updated` });
});

//post route to create new post /posts
router.post('/', (req, res) => {
    const post = req.body;
    const newUserId = Date.now().toString();
    const newPost = new Post({ id: newUserId, ...post });
    addNewPost(newPost);
    res.status(201).json(newPost);
});

//post route to add comments /posts/:id/comments
router.post('/:id/comments', (req, res) => {
    const id = parseInt(req.params.id);
    const newComment = req.body;
    addCommentToPost(id, newComment);
    res.status(201).json(newComment);
});

router.get('/:id', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file from disk:', err);
            return;
        }
        try {
            const posts = JSON.parse(data);
            const id = parseInt(req.params.id);
            const post = posts.filter(post => post.id === id);
            res.json(post);
        } catch (err) {
            console.log('Error parsing JSON string:', err);
        }
    });
});

module.exports = router;

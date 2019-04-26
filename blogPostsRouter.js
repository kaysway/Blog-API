const express = require("express");
const router = express.Router();


const {BlogPosts} = require('./models');

BlogPosts.create('Creating blank blog post #1');
BlogPosts.create('Creating blank blog post #2');

// GET request to BlogPosts to return all current Blog Posts
app.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

// POST request when a new BlogPost is created.
// 400 error occurs if post is missing a title, content, or author
app.post('/', (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(item);
});
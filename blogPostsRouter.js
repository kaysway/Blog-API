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

// PUT request for updating blog posts
router.put('/:id', (req, res) => {
    const requiredFields = ['id', 'content', 'author', 'publishDate'];
    for (let i = 0; i < requireFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in req body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blog post with \`${req.params.id}\``);

    BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).end();
});
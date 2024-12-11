const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(posts);
});

// Create a post (must be logged in)
router.post('/', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Not authorized' });
    const { content } = req.body;
    const post = new Post({ author: req.user._id, content });
    await post.save();
    const populated = await Post.findById(post._id).populate('author', 'username');
    res.json(populated);
});

// Edit a post
router.put('/:id', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Not authorized' });
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Forbidden' });

    post.content = content;
    await post.save();
    const populated = await Post.findById(post._id).populate('author', 'username');
    res.json(populated);
});

// Delete a post
router.delete('/:id', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Not authorized' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Forbidden' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
});

module.exports = router;

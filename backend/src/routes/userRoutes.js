const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Get user profile (public)
router.get('/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ author: user._id }).populate('author', 'username').sort({ createdAt: -1 });
    res.json({ user, posts });
});

// Update user description (must be logged in and must be the same user)
router.put('/:username', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Not authorized' });

    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user._id.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Forbidden' });

    user.description = req.body.description || '';
    await user.save();
    res.json({ user });
});

module.exports = router;

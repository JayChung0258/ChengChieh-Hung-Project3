const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword, comparePasswords } = require('../utils/hash');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const passwordHash = await hashPassword(password);
    const user = new User({ username, passwordHash });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, 
        sameSite: 'lax', 
        maxAge: 24 * 60 * 60 * 1000
    }).json({ message: 'Registered and logged in', user });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await comparePasswords(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, 
        sameSite: 'lax', 
        maxAge: 24 * 60 * 60 * 1000
    }).json({ message: 'Logged in', user });
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });
});

module.exports = router;

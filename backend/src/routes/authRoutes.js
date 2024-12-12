const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword, comparePasswords } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const isProduction = process.env.NODE_ENV === 'production';

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        console.log("Register failed: Missing fields");
        return res.status(400).json({ error: 'Missing fields' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        console.log("Register failed: User already exists");
        return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await hashPassword(password);
    const user = new User({ username, passwordHash });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }).json({ message: 'Registered and logged in', user });

    console.log(`User registered and logged in: ${user.username}`);
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        console.log("Login failed: Missing fields");
        return res.status(400).json({ error: 'Missing fields' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        console.log("Login failed: Invalid credentials (user not found)");
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await comparePasswords(password, user.passwordHash);
    if (!isMatch) {
        console.log("Login failed: Invalid credentials (password mismatch)");
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }).json({ message: 'Logged in', user });

    console.log(`User logged in: ${user.username}`);
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }).json({ message: 'Logged out' });

    console.log("User logged out");
});

module.exports = router;

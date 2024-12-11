// authCheckRoutes.js
const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ user: { username: req.user.username, _id: req.user._id } });
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return next();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data.userId);
        if (!user) return next();
        req.user = user;
        next();
    } catch (err) {
        next();
    }
}

module.exports = authMiddleware;

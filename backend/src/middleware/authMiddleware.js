const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    console.log("Token received:", token);
    if (!token) {
        console.log("No token found");
        return next();
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("JWT verified, data:", data);
        const user = await User.findById(data.userId);
        if (!user) {
            console.log("User not found:", data.userId);
            return next();
        }
        req.user = user;
        console.log("Authenticated user:", user.username);
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        next();
    }
}

module.exports = authMiddleware;

// backend/src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const authCheckRoutes = require('./routes/authCheckRoutes');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({
    origin: isProduction ? 'https://chengchiehhung-project3.onrender.com' : 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authMiddleware, authRoutes);
app.use('/api/auth', authMiddleware, authCheckRoutes);
app.use('/api/posts', authMiddleware, postRoutes);
app.use('/api/users', authMiddleware, userRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

module.exports = app;

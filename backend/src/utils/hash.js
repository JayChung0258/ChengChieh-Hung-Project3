const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

async function comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePasswords };

const jwt = require('jsonwebtoken');
const winston = require("winston");

function encodeToken(data, tokenExpiry, tokenSecret) {
    const token = jwt.sign(
        data,
        tokenSecret,
        { expiresIn: tokenExpiry.toString() + 'h' }
    );
    winston.info(`Token Generated Successfully!!`);
    return token;
}

module.exports = {
    encodeToken
}

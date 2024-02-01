const jwt = require('jsonwebtoken');

function decodeToken(enc, tokenSecret, done) {
    try {
        const decrypt = jwt.verify(enc, tokenSecret)
        done(null, decrypt);
    } catch (ex) {
        done(ex);
    }
}

module.exports = {
    decodeToken
}
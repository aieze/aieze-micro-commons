const authentication = require('./authenticate');
const authorization = require('./authorize');

module.exports = function secure(app, AUTH) {
    app.use(authentication(AUTH));
    app.use(authorization(AUTH));
}
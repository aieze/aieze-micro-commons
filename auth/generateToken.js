const ENCODE = require('../auth/jwt.encoder');
const redis = require("../db/redis");

const generate = async (userName, payload, tokenExpiry, tokenSecret, req) => {

    if (!userName) {
        throw new Error('UserName is Missing!')
    }

    const userArray = {
        ...payload,
        ua: req.headers["user-agent"],
        date_modified: new Date()
    };

    const token = ENCODE.encodeToken(userArray, tokenExpiry, tokenSecret);
    const build = {
        encoded: token,
        plain: userArray
    };

    redis.SetRedis(user_name, token, tokenExpiry * 60 * 60).catch(err => { console.error(err) })
    return build;
};




module.exports = {
    generate
};

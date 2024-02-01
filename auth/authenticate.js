const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const STATUS = require("../constants/STATUS");
const { match, parse } = require("matchit");
let redis = require("../db/redis");
let crypto = require('crypto');

const authentication = (AUTH) => {
    return async(req, res, next) => {
        const url = req._parsedUrl.pathname;
        const urlExist = Object.keys(match(url, AUTH.API.PUBLIC.map(parse))).length;
        const isAuthApi = urlExist == 0 ? false : true;

        if (isAuthApi) return next();

        const token = req.header("authorization");

        req.plainToken = null;
        try {

            if (isPublicVCApi) {

                if (token) {
                    var decoded = jwt.verify(token, AUTH.SECRET_KEY);
                } else {
                    return next();
                }

            } else {
                var decoded = jwt.verify(token, AUTH.SECRET_KEY);
            }

            req.plainToken = decoded;
            let isUserValid = await redis.GetKeyRedis(req.plainToken.user_name);
            if (isUserValid) {
                logger.info(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
                logger.info(
                    `Read Token Successfully for User : ${req.plainToken.user_name}`
                );
                next();
            } else {

                var hashKey = crypto.createHash('md5').update(token).digest('hex');

                let isUserValidForSelfReg = await redis.GetKeyRedis(hashKey);

                if (isUserValidForSelfReg) {
                    logger.info(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
                    logger.info(
                        `Read Token Successfully for User : ${req.plainToken.user_name}`
                    );
                    next();
                } else {
                    logger.debug(`Token Not Found In Redis`);
                    res.status(STATUS.UNAUTHORIZED).send("Unauthenticated access!");
                }
            }
        } catch (ex) {
            logger.debug(`Error decrypting token ${JSON.stringify(ex)}`);
            res.status(STATUS.UNAUTHORIZED).send("Unauthenticated access!");
        }
    };
}

const authenticationMiddleware = (AUTH) => {
    return authentication(AUTH);
};

module.exports = authenticationMiddleware;
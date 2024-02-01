const STATUS = require("../constants/STATUS");
const { match, parse } = require("matchit");


const authorization = (AUTH) => {
    return async(req, res, next) => {
        const url = req._parsedUrl.pathname;
        const urlExist = Object.keys(match(url, AUTH.API.PUBLIC.map(parse))).length;
        const isAuthApi = urlExist == 0 ? false : true;

        if (isAuthApi) return next();
        let found = false;

        if (req.plainToken) {

            const token = req.plainToken;
            const userName = JSON.stringify(token.user_name);
            found = true;
        }

        if (found) {
            return next();
        } else {
            return res.status(STATUS.FORBIDDEN).send("Unauthorized request!");
        }
    }
}
module.exports = async (req, res, next) => {

    
};


const authorizationMiddleware = (AUTH) => {
    return authorization(AUTH);
};

module.exports = authorizationMiddleware;
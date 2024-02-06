
const shortid = require('shortid');
const mongoDB = require("../db/mongoDB");
const MONGO_COLLECTIONS = require("../constants/MongoCollections");
const redis = require("../db/redis");
const logger = require("../config/logger");

const baseUrl = process.env.SHORTURL_PATH;

const shorten = async (longUrl) => {
    logger.info(`URLShortnerUtility.js :: shorten :: longUrl :: ${longUrl}`);
    try {

        const existingShortUrl = await mongoDB.findOne(MONGO_COLLECTIONS.URL_SHORTNER, {longUrl});
        logger.info(`URLShortnerUtility.js :: shorten :: longUrl :: ${longUrl} :: existingShortUrl :: ${existingShortUrl}`);
        if (existingShortUrl) {
            return existingShortUrl.shortUrl;
        }

        const urlCode = shortid.generate();
        const shortUrl = baseUrl + '/' + urlCode;

        // invoking the Url model and saving to the DB
        const urlModel = {
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
        };
        logger.info(`URLShortnerUtility.js :: shorten :: longUrl :: ${longUrl} :: urlModel :: ${JSON.stringify(urlModel)}`);
        await mongoDB.insertOne(MONGO_COLLECTIONS.URL_SHORTNER, urlModel);
        redis.SetRedis(urlCode, longUrl, 60 * 60 * 24).then().catch(err => console.log(err));
        return shortUrl;
    }
    // exception handler
    catch (err) {
        logger.error(`URLShortnerUtility.js :: shorten :: longUrl :: ${longUrl} :: Error occurred while generating short url :: `, err);
        return null;
    }
}

module.exports = {
    shorten
}
// COMMOM INIT Class 

const db = require("./db/db");
const dynamodb = require("./config/dynamodb");
const pg = require("./config/pg");
const mongoDB = require("./config/mongoDB");
const mongoDBRead = require('./config/mongoDBRead');
const MONGO_COLLECTIONS = require("./constants/MONGO_COLLECTIONS")
const STATUS = require("./constants/STATUS");
const CONST = require("./constants/CONST");
const QUERY = require("./constants/QUERY");
const JSONUTIL = require("./utility/JSONUTIL");
const SMS = require("./utility/SMS");
const SMSutility = require("./utility/smsUtility");
const WHATSAPPutility = require("./utility/whatsappUtility");
const emailUtility = require("./utility/emailUtility");
const queryUtility = require("./utility/queryUtility");
const logger = require("./config/logger");
const redis = require("./config/redis");
const appVersionMiddleWare = require("./middleware/appversion.middleware");
let smsMasterList = require('./config/sms');
const s3Util = require('./utility/s3.util');
const DB_STATUS = require('./constants/DB_STATUS');
const html_to_pdf = require('./config/html-to-pdf');
const whatsapp = require('./config/whatsapp');
const velocity = require('./config/velocity');

module.exports = {
    db,
    mongoDB,
    mongoDBRead,
    dynamodb,
    pg,
    STATUS,
    CONST,
    QUERY,
    JSONUTIL,
    queryUtility,
    logger,
    redis,
    appVersionMiddleWare,
    smsMasterList,
    s3Util,
    DB_STATUS,
    MONGO_COLLECTIONS,
    html_to_pdf,
    whatsapp,
    SMS,
    SMSutility,
    velocity,
    WHATSAPPutility,
    emailUtility
    // initKafkaProducer,
    // initKafkaConsumer
}


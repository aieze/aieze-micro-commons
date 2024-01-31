// COMMOM INIT Class 

const mysql = require("./db/mysql");
const pg = require("./db/pg");
const mongoDB = require("./db/mongoDB");
const mongoDBRead = require('./db/mongoDBRead');
const STATUS = require("./constants/STATUS");
const JSONUTIL = require("./utility/JSONUTIL");
const smsUtility = require("./utility/smsUtility");
const whatsappUtility = require("./utility/whatsappUtility");
const emailUtility = require("./utility/emailUtility");
const queryUtility = require("./utility/queryUtility");
const logger = require("./config/logger");
const redis = require("./db/redis");
const s3Util = require('./utility/s3.util');
const html_to_pdf = require('./config/html-to-pdf');
const velocity = require('./config/velocity');

module.exports = {
    mysql,
    mongoDB,
    mongoDBRead,
    pg,
    STATUS,
    JSONUTIL,
    queryUtility,
    logger,
    redis,
    s3Util,
    html_to_pdf,
    smsUtility,
    velocity,
    whatsappUtility,
    emailUtility
}


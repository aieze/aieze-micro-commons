const axios = require('axios');
const LOGGER = require('../config/logger');
let entityId = process.env.AIEZE_DLT_ENTITY_ID;
let senderId = process.env.AIEZE_DLT_SENDER_ID;
let userId = process.env.AIEZE_SMS_GATEWAY_USER_ID;
let password = process.env.AIEZE_SMS_GATEWAY_PASSWORD;
let smsGatewayUrl = process.env.AIEZE_SMS_GATEWAY_BASE_URL;

const sendSMS = async(templateId, mobileNo, compiledSMSText) => {
    return new Promise(async (resolve, reject) => {
        try {
            let buildSMSurl = `${smsGatewayUrl}?UserID=${userId}&Password=${password}&SenderID=${senderId}&Phno=${mobileNo}&Msg=${compiledSMSText}&EntityID=${entityId}&TemplateID=${templateId}`;
            console.log(buildSMSurl);
            const response = await axios(buildSMSurl);
            console.log(response);
            resolve(response);
        } catch (error) {
            LOGGER.error(`Error occurred while sending sms to mobile no: ${mobileNo}`, error);
            reject(error);
        }
    })
}

module.exports = {sendSMS};

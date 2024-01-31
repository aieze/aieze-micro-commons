const axios = require('axios');
const LOGGER = require('../config/logger');
let fromEmailId = process.env.AIEZE_FROM_EMAIL;
let emailAPIKey = process.env.AIEZE_EMAIL_API_KEY;
let emailGatewayUrl = process.env.AIEZE_EMAIL_GATEWAY_BASE_URL;

const sendEmail = async(to=[], cc=[], bcc=[], subject, body, attachments=[]) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {
                "from": {
                    "email": fromEmailId
                },
                "subject": subject,
                "content": [
                    {
                        type: 'html',
                        value: body
                    }
                ],
                "attachments": attachments,
                "personalizations": [
                    {
                        to: to,
                        cc: cc,
                        bcc: bcc
                    }
                ]
            };


            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: emailGatewayUrl,
                headers: { 
                  'api_key': emailAPIKey, 
                  'Content-Type': 'application/json'
                },
                data : JSON.stringify(data)
            };
            const response = await axios.request(config);
            resolve(response);
        } catch (error) {
            LOGGER.error(`Error occurred while sending email to email Id: ${to}`, error);
            reject(error);
        }
    })
}

module.exports = {sendEmail};
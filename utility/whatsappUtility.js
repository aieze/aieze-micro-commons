const axios = require('axios');
const LOGGER = require('../config/logger');
let fromMobileNumber = process.env.VC_WHATSAPP_GATEWAY_FROM_MOBILE_NUMBER;
let whatsappApiKey = process.env.VC_WHATSAPP_GATEWAY_API_KEY;
let whatsappGatewayUrl = process.env.VC_WHATSAPP_GATEWAY_BASE_URL;

const sendWhatsappSms = async(templateId, mobileNo, placeholders, buttons = [], mediaUrl = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {
                "from": fromMobileNumber,
                "to": mobileNo,
                "type": "template",
                "message": {
                  "templateid": templateId,
                  "placeholders": [...placeholders]
                }
            };

            if (mediaUrl) {
                data.message['url'] = mediaUrl;
            }

            if (buttons && buttons.length > 0) {
                data.message['buttons'] = buttons;
            }

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: whatsappGatewayUrl,
                headers: { 
                  'apikey': whatsappApiKey, 
                  'Content-Type': 'application/json'
                },
                data : JSON.stringify(data)
            };
            const response = await axios.request(config);
            resolve(response);
        } catch (error) {
            LOGGER.error(`Error occurred while sending whatsapp to mobile no: ${mobileNo}`, error);
            reject(error);
        }
    })
}

module.exports = {sendWhatsappSms};
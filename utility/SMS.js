let AWS = require('aws-sdk');
let aws_region = process.env.REGION_NAME;
let applicationId = process.env.VC_PINPOINT_APP_ID;
let messageType = "TRANSACTIONAL";
let senderId = process.env.VC_PINPOINT_SENDER_ID;
let entityId = process.env.VC_PINPOINT_ENTITY_ID;

function sendSMS(destinationNumber, message, templateId) {
  AWS.config.update({ region: aws_region });
  console.log(message)
  let pinpoint = new AWS.Pinpoint();
  let params = {
      ApplicationId: applicationId,
      MessageRequest: {
        Addresses: {
          [destinationNumber]: {
            "BodyOverride": message, // extra line added
            ChannelType: 'SMS'
          }
        },
        MessageConfiguration: {
          SMSMessage: {
            Body: message,
            MessageType: messageType,
            SenderId: senderId
            // TemplateId: templateId,
            // EntityId: entityId
          }
        }
      }
    };
    
    //Try to send the message.
    pinpoint.sendMessages(params, function(err, data) {
      // If something goes wrong, print an error message.
      if(err) {
        console.log(err.message);
      // Otherwise, show the unique ID for the message.
      } else {
        console.log("Message sent! " 
            + data['MessageResponse']['Result'][destinationNumber]['StatusMessage']);
      }
    });
    
}


module.exports.sendSMS = sendSMS;

# Aieze Commons



## Problem Statement

In every project we are using commons service. To avoid creating same service in every project created this aieze-micro-commons repo so that
It can be installed wherever needed.

## How to use

To use this commons service in your respective micro service you just need to run below command

```
npm i git+https://gitlab.aieze.in/aieze-public-products/aieze-micro-commons.git

```

Once you run above command, it will be added into your dependencies in package.json. Now you can use the comman functions

## What are the changes in this approach

- Environment variables will be prefixed with *AIEZE_COMMON_*
- In *aieze-micro-commons* we have to add only common configurations and functions. No project specific code will be kept here

## How to use redis 

For using redis you need to add following environment variables in your service

```
"AIEZE_COMMON_REDIS_REQUIRED":true, // set false if redis is not required
"AIEZE_COMMON_REDIS_HOST":"localhost", // replace with appropriate host
"AIEZE_COMMON_REDIS_PORT":6379, // replace with appropriate port
"AIEZE_COMMON_REDIS_USER":"", // replace with appropriate user
"AIEZE_COMMON_REDIS_PASSWORD":"", // replace with appropriate password

```

After adding above environment variables in package.json, now you able to use redis.


## How to use postgresSql 

For using postgresSql you need to add following environment variables in your service

```
    "AIEZE_COMMON_PG_DB_REQUIRED": true, // set false if redis is not required
    "AIEZE_COMMON_MASTER_USER": "root", // replace with appropriate pg user name
    "AIEZE_COMMON_MASTER_DATABASE": "communication_services", // replace with appropriate db name
    "AIEZE_COMMON_MASTER_PASSWORD": "password", //replace with appropriate db password
    "AIEZE_COMMON_MASTER_HOST": "localhost", // replace with appropriate pg host
    "AIEZE_COMMON_MASTER_PORT": 5432, // replace with appropriate pg port

```

After adding above environment variables in package.json, now you able to use postgresSql.

## How to use MongoDB

For using MongoDB you need to add following environment variables in your service

```
    "AIEZE_COMMON_NOSQL_HOST": "127.0.0.1", // replace with appropriate host
    "AIEZE_COMMON_NOSQL_PORT": "27017", // replace with appropriate port
    "AIEZE_COMMON_NOSQL_DATABASE": "vc",  // replace with appropriate db name
    "AIEZE_COMMON_NOSQL_AUTH_DATABASE": "",  // replace with appropriate auth db name
    "AIEZE_COMMON_NOSQL_USER": "",  // replace with appropriate user
    "AIEZE_COMMON_NOSQL_PASSWORD": "",  // replace with appropriate password
    "AIEZE_COMMON_NOSQL_DB_REQUIRED": true,  // set false with mongo db is not required

```

After adding above environment variables in package.json, now you able to use MongoDB.


## How to use Email Utility

For using Email Utility you need to add following environment variables in your service

```
    "AIEZE_COMMON_FROM_EMAIL": "no-reply@aieze.in",
    "AIEZE_COMMON_EMAIL_API_KEY": "e5718d5d180925b97404b932a5ab2b79",
    "AIEZE_COMMON_EMAIL_GATEWAY_BASE_URL": "https://emailapi.netcorecloud.net/v5/mail/send",
    "CONTACT_US_EMAIL": "sud5868@gmail.com", // this values only for testing purpose. for production these values will be replaced
    "CONTACT_US_EMAIL_CC": "ck@aieze.in", // this values only for testing purpose. for production these values will be replaced
    "CONTACT_US_EMAIL_BCC": "sudhir.kumarrao@aieze.in,narsima.chilkuri@aieze.in" // this values only for testing purpose. for production these values will be replaced

```

After adding above environment variables in package.json, now you able to use Email Utility.

```
    Step 1: Import email utility in your respective micro service
    const { emailUtility } = require("aieze-micro-commons");


    Step 2: Following code is for sending email with or without attachment

    const emailContactData = async (data, fileData) => {
        try {

            const renderData = {
                data
            }

            const subject = `${data.name} | ${data.phone} | AIEZE Enquiry`;
            const emailHtml = await generateHtmlFromEjs(renderData, 'views/pages/contactEmail.ejs');

            let cc_mail = process.env.CONTACT_US_EMAIL_CC ? process.env.CONTACT_US_EMAIL_CC.split(',').map(email => ({ email: email.trim() })) : [];
            let bcc_mail = process.env.CONTACT_US_EMAIL_BCC ? process.env.CONTACT_US_EMAIL_BCC.split(',').map(email => ({ email: email.trim() })) : [];

            if(fileData){
                const fileName = fileData.originalname;
                const content = fileData.buffer;
                const contentType = fileData.mimetype;

                // If you have an attachment
                await sendEmail([{ email: process.env.CONTACT_US_EMAIL }], cc_mail, bcc_mail, subject, emailHtml, [{
                    'filename': fileName,
                    'content': content,
                    'contentType': contentType
                }])

            } else {
                // If you don't have an attachment
                await sendEmail([{ email: process.env.CONTACT_US_EMAIL }], cc_mail, bcc_mail, subject, emailHtml, [])        
            }
            
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }




```


## How to use SMS Utility

For using SMS Utility you need to add following environment variables in your service

```
    "AIEZE_COMMON_SMS_GATEWAY_BASE_URL": "http://nimbusit.biz/api/SmsApi/SendSingleApi",
    "AIEZE_COMMON_SMS_GATEWAY_PASSWORD": "dpig2349DP",
    "AIEZE_COMMON_SMS_GATEWAY_USER_ID": "aiezebiz",
    "AIEZE_COMMON_DLT_SENDER_ID": "AIEZEH",
    "AIEZE_COMMON_DLT_ENTITY_ID": "1501407030000013858",

```

After adding above environment variables in package.json, now you able to use SMS Utility.

```
    Step 1: Import SMS utility into your respective service
    const { SMSutility } = require("aieze-micro-common");

    Step 2: Following code is for sending SMS
    const sendOTP = async (otpData) => {
        try {
            let phone_no = `${otpData.dial_code} ${otpData.mobile_no}`;
            let time = CONST.SMS_TEMPLATES.otpLogin.time;
            let message = CONST.SMS_TEMPLATES.otpLogin.body.replace('<otp>', otpData.otp).replace('<time>', time);
            await SMSutility.sendSMS(CONST.SMS_TEMPLATES.otpLogin.template_id, otpData.mobile_no, message);
            return true
        } catch (error) {
            throw error;
        }
    }
```


## How to use Whatsapp Utility

For using Whatsapp Utility you need to add following environment variables in your service

```
    "AIEZE_COMMON_WHATSAPP_GATEWAY_BASE_URL": "https://api.pinbot.ai/v2/wamessage/sendMessage",
    "AIEZE_COMMON_WHATSAPP_GATEWAY_API_KEY": "4808679a-7a41-11ee-b22d-92672d2d0c2d",
    "AIEZE_COMMON_WHATSAPP_GATEWAY_FROM_MOBILE_NUMBER": "917303544301",

```

After adding above environment variables in package.json, now you able to use Whatsapp Utility.

```
    Step 1: Import Whatsapp utility into your respective service
    const { WHATSAPPutility } = require("aieze-micro-common");

    Step 2: Following code is for sending Whatsapp message
    authService.sendOTP = async (otpData) => {
        try {
            let phone_no = `${otpData.dial_code} ${otpData.mobile_no}`;
            const placeholders = [otpData.otp, CONST.WHATSAPP_TEMPLATES.otpLogin.time];
            await WHATSAPPutility.sendWhatsappSms(CONST.WHATSAPP_TEMPLATES.otpLogin.template_id, otpData.mobile_no, placeholders)
            return true
        } catch (error) {
            throw error;
        }
    }
```


## How to use S3 Utility

For using S3 Utility you need to add following environment variables in your service

```
    "DIGITAL_OCEAN_ACCESS_KEY_ID": "DO00YY4RMUJCNJJAV3Q4",
    "DIGITAL_OCEAN_SECRET_ACCESS_KEY": "DUwzOivxHjFbnDBIdUZDERN2P3Ass7mCYW1JhVzJRJg",
    "DIGITAL_OCEAN_SPACES_ENDPOINT": "https://blr1.digitaloceanspaces.com",
    "DIGITAL_OCEAN_SPACE": "link-prod-beta",

```

After adding above environment variables in package.json, now you able to use S3 Utility.

```
    Step 1: Import Whatsapp utility into your respective service
    const { s3Util } = require("aieze-micro-common");

    const params = {
        Bucket: process.env.DIGITAL_OCEAN_SPACE,
        Key: `link-users/profile-pictures/${fileData.file_name}`,
        Body: req.files.file.data
    };

        /*
        * 1st param file name
        * 2nd param file body
        * 3rd param bucket name
        * 4th param content type
        * 5th param publicRead - set true if you want to make this object publicly accessible using CDN
        */
        s3Util.uploadFile(params.key, params.Body, params.Bucket, false, false, async function (error, data) {
            if (error) {
                res.status(STATUS.INTERNAL_SERVER_ERROR).send(error);
            } else {
                await mongoDB.upsertOne(
                MONGO_COLLECTIONS.LINK_USERS,
                { user_id: userResult.user_id },
                { profile_pic: data.Location }
                );
                redis.del(key);
                res.status(STATUS.OK).send({ message: "Image uploaded successfully" });
            }
        });
```

let CryptoJS = require("crypto-js");
let moment = require("moment");
const CRYPTO_KEY = 'LINK@$#&*(!@%^&'


exports.REDIS_KEY_TO_SHARE_POLL_RESPONSES = 'REDIS_KEY_TO_SHARE_POLL_RESPONSES';

exports.LINK_ENTERPRISE_PACKAGE_ID = 3

exports.HEADER = {
    authToken: "authorization"
};

exports.ageLimit = {
    MAX_AGE: 150,
    AGE_LIMIT: 45,
    MIN_AGE: 45,
    COMORBILITY_AGE_LIMIT: 45
}

exports.SERVICES = {
    MOBILE: "+91<mobile@anchal.com>",
    OTP_TRIALS: 3,
    NEXT_OTP: 60,
    email_To: "email_To",
    emailTo_feedback: "emailTo_feedback",
    newUser_sms: "newUser_sms",
    forgotPwd_sms: "forgotPwd_sms",
    update_mobno_sms: "update_mobno_sms",
    resetUser_sms: "resetUser_sms",
    verify_mobno_sms: "verify_sms",
    register_sms: "register_sms",
    session_sms: "session_sms",
    default_pass: "VC_123",
    campaign_id: "3737373",
    VC_audit_logs_localFile_maxSize: 1
};

exports.OTPREASONS = {
    FORGOTPASSWORD: "FORGOT PASSWORD",
    UPDATEMOBNO: "UPDATE MOBILE NUMBER",
    VERIFYMOBNO: "VERIFY MOBILE NUMBER"
};

exports.CalenderMonths = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12
}

exports.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

exports.decryptPayload = function (reqData) {
    if (reqData) {
        let bytes = CryptoJS.AES.decrypt(reqData, CRYPTO_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } else {
        return "";
    }
};

exports.decryptPayloadWithTimestamp = function (reqData, timestamp) {
    let key = CRYPTO_KEY + timestamp;
    if (reqData) {
        let bytes = CryptoJS.AES.decrypt(reqData, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    } else {
        return "";
    }
};

exports.encryptPayload = function (reqData) {
    let key = CRYPTO_KEY;
    if (reqData) {
        return CryptoJS.AES.encrypt(JSON.stringify(reqData), key).toString();
    } else {
        return "";
    }
};

exports.ageLimit = {
    MAX_AGE: 150,
    AGE_LIMIT: 18,
    MIN_AGE: 45,
    COMORBILITY_AGE_LIMIT: 45
}

exports.SMS_TEMPLATES = {
    otpLogin: {
        body: 'Your OTP to login/access LINK is <otp>. It will be valid for <time> minutes. -AIEZE',
        template_id: '1107169925196454688',
        time: '1',
    },
    forgotPasswordOtp: {
        body: 'Your OTP to reset pin for LINK Application is <otp>. It will be valid for <time> minutes. Please do not share this OTP with anyone. -AIEZE',
        template_id: '1107169925129963943',
        time: '1'
    },
    webinarReminder: {
        body: `Hello <name>! This is a reminder for the upcoming webinar:

        Webinar Name: <webinarName>
        Date: <webinarDate>
        Time: <webinarTime>
        
        Join here: <webinarLink> -AIEZE`,
        template_id: "1107170481416210745"
    },
    webinarRegistration: {
        body: `Hello <name>! 

        Registration successful for the upcoming webinar:
        
        Webinar Name: <webinarName>
        Date: <webinarDate>
        Time: <webinarTime>
        
        Join here: <webinarLink> -AIEZE`,
        template_id: "1107170481391449823"
    }
}


exports.WHATSAPP_TEMPLATES = {
    otpLogin: {
        template_id: '114029',
        time: '1',
    },
    forgotPasswordOtp: {
        template_id: '114319',
        time: '1'
    },
    couponAppliedIntimation: {
        template_id: '125167'
    },
    webinarRegistrationReminder: {
        template_id: '127579'
    },
    webinarRegistrationIntimation: {
        template_id: '132487'
    }
}

exports.exceed_attempts_limit = 50

exports.CACHE_TTL = {
    SHORT: 15 * 60,
    MID: 60 * 60,
    PAYMENT_LINK: 2 * 60 * 30,
    LONG: 24 * 60 * 60
};

exports.uniqueID = async function () {
    let d = new Date();
    let timestamp = d.getTime();

    return timestamp;
};

exports.admin_secret_key = {
    secret: '30c85dc9-a5e2-422b-9028-d83378597497'
}

exports.APP_CATEGORY_LEVELS = {
    "GOVT": ["National", "State", "District", "Block", "Village", "Hospital", "Department", "Front Desk"],
    "PVT": ["Organization", "Hospital", "Department", "Front Desk"]
}

exports.GENDER = {
    1: 'Male',
    2: 'Female',
    3: 'Others'
}
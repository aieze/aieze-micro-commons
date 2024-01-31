exports.SECRET_KEY = "VC_2021";
exports.SECRET_KEY_CERT = "VC_CERT_2021";
exports.AMS_SECRET_KEY = "D6gz6OMQ4Fth7pPXk0ZBfykNinaaDTow";
exports.EXPIRY_DAY = 1;
exports.EXPIRY_HOURS = 8;
exports.EXPIRY_30_DAYS = 30;
exports.EXPIRY_MINS = 15;

exports.API = {
    PUBLIC: [
        "/api/v1/meeting/health",
        "/api/v1/auth/health",
        "/api/v1/subscription/health",
        "/api/v1/meeting/stylingUrl",
        "/api/v1/meeting/uploadcss",
        "/api/v1/meeting/validate_meeting",
        "/api/v1/meeting/addToCalendar",
        "/api/v1/meeting/getWebhookEvent",
        "/api/v1/meeting/hooks",
        "/api/v1/meeting/updateRecording",
        "/api/v1/meeting/getRecording",
        "/api/v1/meeting/endMeeting",
        "/api/v1/meeting/getMeetingParticipantsCount",
        "/api/v1/meeting/getWebinarParticipants",
        "/api/v1/meeting/publishReaction",
        "/api/v1/auth/verifyMobile",
        "/api/v1/auth/resetPin",
        "/api/v1/auth/generateOTP",
        "/api/v1/auth/validateOTP",
        "/api/v1/auth/loginByPin",
        "/api/v1/auth/generateOTPForResetPin",
        "/api/v1/auth/validateOTPForResetPin",
        "/api/v1/auth/login",
        "/api/v1/auth/countryCodes",
        "/api/v1/auth/update_records_with_country_code",
        "/api/v1/auth/uploadUpdateJson",
        "/api/v1/auth/getLogoByMeeting/:meeting_code",
        "/api/v1/auth/getAMSToken",
        "/api/v1/auth/apk/updateJson",
        "/api/v1/subscription/payment/callback/:transactionId", // RAZORPAY
        "/api/v1/subscription/payment/paytm/callback/:transactionId", // PAYTM
        
        "/api/v1/subscription/package/getAllPackages",
        "/api/v1/subscription/package/getPackages",
        "/api/v1/subscription/package/getPlansByPackage/:package_id",
        "/api/v1/subscription/package/getSubPlansByPlan/:plan_id",
        "/api/v1/subscription/package/getSubPlan/:sub_plan_id",
        "/api/v1/subscription/requestAqoute",
        "/api/v1/subscription/coupon/getCouponUsage",
        // "/api/v1/meeting/contact/getLinkVerification",
        
        "/api/v1/auth/location/states",
        "/api/v1/auth/location/districts/:stateId",
        "/api/v1/chatgpt/health",
        "/api/v2/meeting/health",
        "/api/v2/meeting/validate_meeting",
        "/api/v2/meeting/endMeeting",
        "/api/v2/meeting/participantDetails/:participant_id",

        "/api/v2/webinar/create",
        "/api/v2/webinar/update",
        "/api/v2/webinar/list",
        "/api/v2/webinar/details/:webinar_event_id",
        "/api/v2/webinar/notifyAllUsers",
        "/api/v2/webinar/banner",
        "/api/v2/webinar/grid",

        "/api/v2/meeting/getWebinarParticipants",
        "/api/v2/meeting/publishReaction"

    ],

    PUBLIC_VC: [
        "/api/v1/meeting/join",
        "/api/v1/meeting/create",
        "/api/v1/subscription/initiatePayment",
        "/api/v1/subscription/paytm/initiatePayment",
        "/api/v1/subscription/getSubscriptionDetails",
        "/api/v1/subscription/getPaymentDetails",
        "/api/v1/meeting/getMeetingDetails",
        "/api/v1/meeting/getPublicChat",
        "/api/v1/meeting/publishVote",
        "/api/v1/meeting/listParticipantsVoted",
        "/api/v2/meeting/create",
        "/api/v2/meeting/join",
        "/api/v2/meeting/getMeetingDetails",
        "/api/v2/meeting/switchBreakoutRoom",
        "/api/v2/meeting/listBreakoutRoomParticipants",
        "/api/v2/meeting/listBreakoutRooms",
        "/api/v2/meeting/toggleMeetingStatus",
        "/api/v2/meeting/endMeeting/:meeting_code",
        "/api/v2/meeting/getMeetingDialDetails/:meeting_code",
        
        "/api/v2/meeting/exportWebinarParticipants",
    ],
    ADMIN: [
    ],
    GUEST: [
    ]
};



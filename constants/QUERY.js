exports.AUTH = {
    selectProfileDtlsQuery:
        "SELECT m.user_id as user_id,m.profile_picture_url as profile_picture_url, m.user_name as username,m.display_name as display_name,m.gender AS gender,m.date_of_birth AS date_of_birth,m.mobile_number as mobile_number, m.role_id as role_id, m.state_id as state,m.district_id as district, m.password as current_password, m.password_last_updated as password_last_updated, m.invalid_attempts as invalid_attempts, m.date_created as date_created, m.is_active as is_active FROM m_users m WHERE m.user_id = $1 AND m.is_deleted <> 1",
    getPasswordComplexityQuery:
        "SELECT * from password_complexity WHERE id=(SELECT max(id) FROM password_complexity)",
    getPasswordHistory:
        "SELECT password FROM m_users_history WHERE user_name = $1 ORDER BY id DESC LIMIT 3",
}

exports.ANDROIDAPP = {
    selectAppVersionNumber: "SELECT apk_version FROM m_app_version ORDER BY release_date DESC LIMIT 1"
}


exports.ADMIN = {
    selectStateQuery: "SELECT state_id,state_name from m_state ORDER BY state_name ASC",
    selectAllDistrictQuery:
        "SELECT district_id,name,state from m_district ORDER BY NAME ASC",
    selectAllBlockQuery:
        "SELECT block_id,block_name,district_id from m_block  ORDER BY NAME ASC",
    selectRoleDetailsQueryByRoleId:
        "SELECT role_id, role_name, role_description, is_active, level, date_modified FROM m_roles WHERE role_id = $1",
    getUserStatus: 
        "select count(*) as count from m_users where user_name = $1 AND is_active = 1",
    getPasswordComplexityQuery:
        "SELECT * from password_complexity WHERE id=(SELECT max(id) FROM password_complexity)",
    viewLFGrid: "select * from vw_m_location_facility",
    viewLFGridGetStateId: "select state_id from vw_m_location_facility",
    viewLFGridbyUpdatedate: "select * from vw_m_location_facility where date_created >= NOW() - INTERVAL 1 DAY or date_modified >= NOW() - INTERVAL 1 DAY;",
    selectConfigQuery: "SELECT c.key ,c.value FROM m_config c WHERE c.key=$1"
}

exports.SUBSCRIPTION = {
    getUserSubscription: `select S.*, PL.plan_id, SP.max_participants, SP.max_cloud_storage, SP.custom_logo_url, SP.live_streaming_available, PK.package_id, COALESCE(SP.vc_api_endpoint,PK.vc_api_endpoint) AS vc_api_endpoint, COALESCE(SP.vc_api_secret,PK.vc_api_secret) AS vc_api_secret, COALESCE(SP.vc_link,PK.vc_link) AS vc_link, SP.webinar_available, SP.custom_preview_banner, SP.custom_meeting_banner, SP.custom_mobile_banner, SP.state_id 
    from tr_subscription S
    INNER JOIN m_sub_plan SP ON SP.sub_plan_id = S.sub_plan_id
    INNER JOIN m_plan PL ON PL.plan_id = SP.plan_id
    INNER JOIN m_package PK ON PK.package_id = PL.package_id
    where S.end_date::DATE >= CURRENT_DATE AND S.user_id = $1 AND S.status = 1;`,
    getSubPlanDetails: `select sp.sub_plan_id, sp.sub_plan_name, sp.duration, sp.price, sp.sub_plan_description, sp.max_participants, sp.max_cloud_storage, pn.plan_id, pn.plan_name, pn.plan_description, pk.package_id, pk.package_name, SP.live_streaming_available, SP.custom_logo_url, PK.package_id, COALESCE(SP.vc_api_endpoint,PK.vc_api_endpoint) AS vc_api_endpoint, COALESCE(SP.vc_api_secret,PK.vc_api_secret) AS vc_api_secret, COALESCE(SP.vc_link,PK.vc_link) AS vc_link, SP.webinar_available,
    pk.package_description from m_sub_plan sp
    inner join m_plan pn on sp.plan_id = pn.plan_id
    inner join m_package pk on pk.package_id = pn.package_id
	WHERE sp.sub_plan_id = $1`
}
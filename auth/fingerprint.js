const Fingerprint = require('express-fingerprint')


module.exports = function secure(app) {
    app.use(Fingerprint({
        parameters:[
            Fingerprint.useragent,
            Fingerprint.acceptHeaders,
            Fingerprint.geoip
        ]
    }))
}
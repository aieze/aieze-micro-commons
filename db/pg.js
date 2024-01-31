const pg = require('pg');
const fs = require('fs');
const PG_TIMEOUT = process.env.AIEZE_PG_TIMEOUT ? parseInt(process.env.AIEZE_PG_TIMEOUT) : 10000;
const params = {
    "user": process.env.VC_MASTER_USER,
    "database": process.env.VC_MASTER_DATABASE,
    "password": process.env.VC_MASTER_PASSWORD,
    "host": process.env.VC_MASTER_HOST,
    "port": process.env.VC_MASTER_PORT,
    "max": 1,
    "idleTimeoutMillis": PG_TIMEOUT
}

if (process.env.VC_MASTER_TLS) {
    params.ssl = {
        ca: fs.readFileSync(process.env.VC_MASTER_TLS_PATH),
    }
}

const pool_init = new pg.Pool(params);

module.exports = {

    executeQuery: async function (dbQuery, callback) {
        const pool = pool_init;
        if (pool == null) {
            callback("DB Pool details not available for dataBase - ", null);
        }
        else {
            pool.connect(function (connectError, client, done) {

                done();

                if (connectError) {
                    callback(connectError, null);
                }
                else {
                    client.query(dbQuery, function (dbError, dbResult) {

                        if (dbError) {
                            callback(dbError, null);
                        }
                        else if (!dbResult) {
                            callback(err, null);
                        } else {

                            callback(null, dbResult.rows);
                        }
                    });
                }
            });
        }
    },

    executeQueryPromise: async (dbQuery) => {
        return new Promise((resolve, reject) => {
            const pool = pool_init;
            if (pool == null) {
                callback("DB Pool details not available for dataBase - ", null);
            }
            else {
                pool.connect(function (connectError, client, done) {

                    done();

                    if (connectError) {
                        reject(connectError);
                    }
                    else {
                        client.query(dbQuery, function (dbError, dbResult) {

                            if (dbError) {
                                console.log(dbError);
                                reject(dbError);
                            }
                            else if (!dbResult) {
                                resolve(null);
                            } else {

                                resolve(dbResult.rows);
                            }
                        });
                    }
                });
            }

        })
    }
}

module.exports.pool_init = pool_init;
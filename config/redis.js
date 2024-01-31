let logger = require('../config/logger'),
    redis = require("redis");

let baseConnectionURI = process.env.VC_REDIS_TLS ? "rediss://" : "redis://";

if (process.env.VC_REDIS_USER && process.env.VC_REDIS_PASSWORD) {
    baseConnectionURI += `${process.env.VC_REDIS_USER}:${process.env.VC_REDIS_PASSWORD}`
}

let client = redis.createClient({ url: `${baseConnectionURI}@${process.env.VC_REDIS_HOST}:${process.env.VC_REDIS_PORT}` });

let clientReader;

if (process.env.VC_REDIS_HOST_READER) {
    clientReader = redis.createClient({ url: `${baseConnectionURI}@${process.env.VC_REDIS_HOST_READER}:${process.env.VC_REDIS_PORT}` });
} else {
    logger.info("Redis replica host not found. falling back to the primary redis host");
    clientReader = redis.createClient({ url: `${baseConnectionURI}@${process.env.VC_REDIS_HOST}:${process.env.VC_REDIS_PORT}` });
}

isRedis = false;
isWriterRedis = false;

clientReader.on("connect", function () {
    logger.info("redis clientReader connected");
    isRedis = true;
});

clientReader.on("error", function (err) {
    logger.error("redis replica connection error " + err);
    throw err;
});

clientReader.on("end", function (err) {
    logger.info("redis replica connection end " + err);
});

client.on("connect", function () {
    logger.info("redis client connected");
    isWriterRedis = true;
});

client.on("error", function (err) {
    logger.error("redis primary connection error " + err);
    throw err;
});

client.on("end", function (err) {
    logger.info("redis primary connection end " + err);
});

function SetRedis(key, val, expiretime) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            let newVal = JSON.stringify(val);
            client.set(key, newVal);
            if (expiretime) {
                client.expire(key, expiretime)
            }

            resolve(redis.print);
        } else {
            reject('err');
        }
    });
}

function GetKeys(key, isScan = false) {
    return new Promise(async (resolve, reject) => {
        if (isRedis) {

            if (isScan) {
                clientReader.keys(key, function (err, reply) {
                    if (err) {
                        reject(err);
                    }

                    if (reply) {
                        resolve(reply);
                    } else {
                        reject('err');
                    }
                });
            } else {
                clientReader.exists(key, function (err, reply) {
                    if (err) {
                        reject(err);
                    }

                    if (reply) {
                        resolve(key);
                    } else {
                        resolve(null);
                    }

                });
            }

        } else {
            reject('err');
        }
    });
}

function GetRedis(key) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            clientReader.mget(key, function (err, reply) {
                if (err) {
                    reject(err);
                }
                if (reply) {
                    resolve(reply);
                } else {
                    reject('err');
                }

            });
        } else {
            reject('err');
        }
    });
}

function GetKeyRedis(key) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            clientReader.get(key, function (err, reply) {
                if (err) {
                    reject(err);
                }
                if (reply) {
                    resolve(reply);
                } else {
                    resolve(false);
                }

            });
        } else {
            resolve(false);
        }
    });
}

function delRedis(keyPattern) {
    return new Promise(async function (resolve, reject) {
        if (isWriterRedis) {
            let getKeys = await GetKeys(keyPattern);
            if (getKeys && getKeys.length > 0) {
                client.del(getKeys, function (err, reply) {
                    if (err) {
                        reject(err);
                    }
                    if (reply) {
                        resolve(reply);
                    } else {
                        resolve();
                    }

                });
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    });
}

const deleteKey = async (key) => {
    return new Promise(async (resolve, reject) => {
        client.del(key, function (err, reply) {
            if (err) {
                reject(err);
            }
            if (reply) {
                resolve(reply);
            } else {
                resolve();
            }
        });
    });
}

function IncrementRedis(key, expiretime) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            client.INCR(key);
            if (expiretime) {
                client.expire(key, expiretime)
            }
            resolve(redis.print);
        } else {
            reject('err');
        }
    });
}

function decrementRedis(key, value) {
    return new Promise(function (resolve, reject) {


        if (isRedis) {
            client.DECRBY(key, value);
            resolve(redis.print);
        } else {
            reject('err');
        }
    });
}

function getTTL(key) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            client.TTL(key, function (err, reply) {
                if (err) {
                    reject(err);
                }
                if (reply) {
                    resolve(reply);
                } else {
                    resolve(false);
                }
            });
        } else {
            resolve(false);
        }
    });
}


function HSetRedis(key, field, val, expiretime) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            let newVal = JSON.stringify(val);
            client.HSET(key, field, newVal, function (err, reply) {
                if (err) {
                    reject(err);
                }

                if (expiretime) {
                    client.expire(key, expiretime)
                }
                resolve(true);
            });

        } else {
            reject('err');
        }
    });
}

function HgetAllRedis(key) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            clientReader.HGETALL(key, function (err, reply) {
                if (err) {
                    reject(err);
                }

                if (reply) {
                    resolve(reply);
                } else {
                    resolve(false);
                }
            });
        } else {
            reject('err');
        }
    });
}

function HDelRedis(key, field) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            client.HDEL(key, field, function (err, reply) {
                if (err) {
                    reject(err);
                }

                if (reply) {
                    resolve(reply);
                } else {
                    resolve();
                }
            });

        } else {
            reject('err');
        }
    });
}

function lRange(key, start, stop) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            clientReader.lrange(key, start, stop, function (err, reply) {
                if (err) {
                    reject(err);
                }
                if (reply) {
                    resolve(reply);
                } else {
                    resolve(false);
                }

            });
        } else {
            resolve(false);
        }
    });
}

function lPush(key, value, expiretime) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            client.lpush(key, value, function (err, reply) {
                if (err) {
                    reject(err)
                } else {
                    if (expiretime) {
                        client.expire(key, expiretime)
                    }
                    resolve(reply)
                }
            });
        } else {
            reject('err');
        }
    });
}


function hIncrBy(key, field, threshold, expiretime) {
    return new Promise(function (resolve, reject) {
        if (isRedis) {
            client.hincrby(key, field, threshold, function (err, reply) {
                if (err) {
                    reject(err)
                } else {
                    if (expiretime) {
                        client.expire(key, expiretime)
                    }
                    resolve(reply)
                }
            });
        } else {
            reject('err');
        }
    });
}

module.exports = client;
module.exports.SetRedis = SetRedis;
module.exports.GetKeys = GetKeys;
module.exports.GetRedis = GetRedis;
module.exports.GetKeyRedis = GetKeyRedis;
module.exports.delRedis = delRedis;
module.exports.IncrementRedis = IncrementRedis;
module.exports.decrementRedis = decrementRedis;
module.exports.getTTL = getTTL;
module.exports.deleteKey = deleteKey;
module.exports.HSetRedis = HSetRedis;
module.exports.HgetAllRedis = HgetAllRedis;
module.exports.HDelRedis = HDelRedis;
module.exports.lRange = lRange;
module.exports.lPush = lPush;
module.exports.hIncrBy = hIncrBy;
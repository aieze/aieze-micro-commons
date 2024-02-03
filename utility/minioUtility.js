const Minio = require('minio');
const util = require('util');

// Initialize MinIO client with your server details
const minioClient = new Minio.Client({
    endPoint: process.env.AIEZE_COMMON_MINIO_ENDPOINT,
    port: process.env.AIEZE_COMMON_MINIO_PORT,
    useSSL: process.env.AIEZE_COMMON_MINIO_USE_SSL,
    accessKey: process.env.AIEZE_COMMON_MINIO_ACCESS_KEY,
    secretKey: process.env.AIEZE_COMMON_MINIO_SECRET_KEY,
});


const getObject = async(bucketName, objectName) => {
    const getObjectAsync = util.promisify(minioClient.getObject.bind(minioClient));
    return new Promise(async(resolve, reject) => {
        try {
            const dataStream = await getObjectAsync({ Bucket: bucketName, Object: objectName });
            
            const chunks = [];
            
            dataStream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            
            dataStream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve(buffer);
            });
            
            dataStream.on('error', (err) => {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    })
}


const uploadObject = async(bucketName, objectName, dataBuffer) => {
    const putObjectAsync = util.promisify(minioClient.putObject.bind(minioClient));
    return new Promise(async(resolve, reject) => {
        try {
            await putObjectAsync(bucketName, objectName, dataBuffer, dataBuffer.length);
            resolve()
        } catch (err) {
            reject(err);
        }
    })
}



module.exports = {
    getObject,
    uploadObject
}



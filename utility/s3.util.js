const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    s3ForcePathStyle: false,
    credentials: {
        accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY_ID,
        secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY
    },
    endpoint: process.env.DIGITAL_OCEAN_SPACES_ENDPOINT
});

const uploadFile = async (fileName, fileBody, bucketName, contentType = false, publicRead = false) => {

    try {

        let params = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileBody
        };

        if (contentType) {
            params.ContentType = `application/${fileName.split(".")[1]}`
        }

        if (publicRead) {
            params.ACL = 'public-read'
        }

        const data = await s3.upload(params).promise()
        const { Location } = data
        return Location


    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }

}


const readFile = async (fileName, bucketName) => {

    try {

        const params = {
            Bucket: bucketName,
            Key: fileName
        };

        const data = await s3.getObject(params).promise()

        return data;

    } catch (error) {
        console.log(error.message)
        return { Body: '[]' };
    }
}


const getPresignedUrl = async (fileName, signedUrlExpireSeconds, bucketName) => {
    return new Promise(async (resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Expires: signedUrlExpireSeconds
        };

        await s3.getSignedUrl('getObject', params, (err, res) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}


const deleteFile = async (fileName, bucketName) => {

    try {

        const params = {
            Bucket: bucketName,
            Key: fileName
        };

        const data = await s3.deleteObject(params).promise()
        return data;

    } catch (error) {
        console.log(error.message)
        return { Body: '[]' };
    }
}

const getFileSize = async (fileName, bucketName) => {
    try {
        const params = {
            Bucket: bucketName,
            Prefix: fileName
        };

        const data = await s3.listObjectsV2(params).promise();
        let size = 0;
        if (data) {
            data.Contents.forEach(object => {
                size += object.Size;
            });
            size = (size / (1024 * 1024)).toFixed(1)
            return size;
        } else {
            return 0;
        }

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
}

const archiveToGlacier = async (fileName, glacierFileName, bucketName, movetoGlacier = false) => {
    try {
        const params = {
            Bucket: bucketName,
            CopySource: `${bucketName}/${fileName}`,
            Key: glacierFileName,
            StorageClass: 'GLACIER'
        };

        const data = await s3.copyObject(params).promise();

        if (movetoGlacier) {
            if (data.CopyObjectResult) {
                await deleteFile(fileName, bucketName)
            }
        }

        return data;

    } catch (error) {
        console.log(error.message)
        return { Body: '[]' };
    }
}

module.exports = {
    uploadFile,
    readFile,
    getPresignedUrl,
    deleteFile,
    getFileSize,
    archiveToGlacier
}
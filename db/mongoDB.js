const { MongoClient } = require('mongodb')
const user = process.env.AIEZE_NOSQL_USER;
const database = process.env.AIEZE_NOSQL_DATABASE;
const auth_database = process.env.AIEZE_NOSQL_AUTH_DATABASE ? process.env.AIEZE_NOSQL_AUTH_DATABASE : database;
const password = process.env.AIEZE_NOSQL_PASSWORD;
const host = process.env.AIEZE_NOSQL_HOST;
const port = process.env.AIEZE_NOSQL_PORT;
const tls = process.env.AIEZE_NOSQL_TLS ? process.env.AIEZE_NOSQL_TLS : false;
const connectionRequired = process.env.AIEZE_NOSQL_DB_REQUIRED

let url = ""

if (user && password) {
    if (tls) {
        url = `mongodb+srv://${user}:${password}@${host}/${database}?readPreference=primary&ssl=true&sslValidate=false&authSource=${auth_database}`
    } else {
        url = `mongodb://${user}:${password}@${host}:${port}/${database}?readPreference=primary&directConnection=true&authSource=${auth_database}`
    }
} else {
    url = `mongodb://${host}:${port}/${database}?readPreference=primary&directConnection=true&ssl=false&authSource=${auth_database}`
}

let dbo;
let client;
async function main() {
    await client.connect()
    console.log('Connected successfully to MongoDB server')
    dbo = client.db(database)
    return 'done.'
}

if (connectionRequired == "true") {
    client = new MongoClient(url)
    main().then(console.log).catch(console.error);
}

const findAll = async (collectionName) => {
    try {
        const collection = dbo.collection(collectionName)
        const findResult = await collection.find({}).toArray()
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const findOne = async (collectionName, doc) => {
    try {
        const collection = dbo.collection(collectionName)
        const findResult = await collection.findOne(doc)
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const isExist = async (collectionName, filterData) => {
    try {
        const collection = dbo.collection(collectionName)
        const result = await collection.find(filterData, { projection: { _id: 1 } }).limit(1).toArray()
        return result.length == 0 ? false : true;
    } catch (error) {
        throw new Error(error.message)
    }
}

const filteredDocs = async (collectionName, filterData, sortParam = {}) => {
    try {
        const collection = dbo.collection(collectionName);
        const findResult = await collection.find(filterData).sort(sortParam).toArray()
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const insertOne = async (collectionName, doc) => {
    try {
        const collection = dbo.collection(collectionName)
        const insertData = await collection.insertOne(doc)
        return insertData
    } catch (error) {
        throw new Error(error.message)
    }
}

const insertMany = async (collectionName, docArray) => {
    try {
        const collection = dbo.collection(collectionName)
        const insertData = await collection.insertMany(docArray)
        return insertData
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateMany = async (collectionName, whrJSON, updatedDoc) => {
    try {
        const collection = dbo.collection(collectionName)
        const updatedData = await collection.updateMany(whrJSON, { $set: updatedDoc })
        return updatedData
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateOne = async (collectionName, whrJSON, updatedDoc) => {
    try {
        const collection = dbo.collection(collectionName)
        const updatedData = await collection.updateOne(whrJSON, { $set: updatedDoc })
        return updatedData
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateOneIncr = async (collectionName, whrJSON, updatedDoc) => {
    try {
        const collection = dbo.collection(collectionName)
        const updatedData = await collection.updateOne(whrJSON, updatedDoc)
        return updatedData
    } catch (error) {
        throw new Error(error.message)
    }
}

const upsertOne = async (collectionName, whrJSON, updatedDoc) => {
    try {
        const collection = dbo.collection(collectionName)
        const updatedData = await collection.updateOne(whrJSON, { $set: updatedDoc }, { upsert: true })
        return updatedData
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

const deleteMany = async (collectionName, whrJSON) => {
    try {
        const collection = dbo.collection(collectionName)
        const deletedData = await collection.deleteMany(whrJSON)
        return deletedData
    } catch (error) {
        throw new Error(error.message)
    }
}

const count = async (collectionName, doc = {}) => {
    try {
        const collection = dbo.collection(collectionName)
        const findResult = await collection.count(doc)
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const findWithLimit = async (collectionName, doc = {}, projection = { _id: 0 }, limit, sortParam, offset = 0) => {
    try {
        const collection = dbo.collection(collectionName)
        const findResult = await collection.find(doc, { projection: projection }).sort(sortParam).limit(limit).skip(offset).toArray();
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const findOneAndUpdate = async (collectionName, whrJSON, updatedDoc, sortParams, upsert = false) => {
    try {
        const collection = dbo.collection(collectionName)
        const updatedData = await collection.findOneAndUpdate(whrJSON, { $set: updatedDoc }, { sort: sortParams }, { upsert: upsert })
        return updatedData
    } catch (error) {
        throw new Error(error.message)
    }
}


const findOneWithProject = async (collectionName, doc, projection) => {
    try {
        const collection = dbo.collection(collectionName)
        const findResult = await collection.findOne(doc, { projection: projection })
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const findWithAggregation = async (collectionName, aggregation) => {
    try {
        let findResult = []
        const collection = dbo.collection(collectionName)
        const aggCursor = collection.aggregate(aggregation);
        for await (const doc of aggCursor) {
            //  console.log(doc);
            findResult.push(doc)
        }
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}


const findWithAggregationwithLimit = async (collectionName, aggregation, projection = { _id: 0 }, limit, sortParam, offset = 0) => {
    try {
        let findResult = []
        const collection = dbo.collection(collectionName)
        const aggCursor = collection.aggregate(aggregation).projection(projection).sort(sortParam).limit(limit).skip(offset);
        for await (const doc of aggCursor) {
            console.log(doc);
            findResult.push(doc)
        }
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const findOneWithProjection = async (collectionName, doc, projection = { _id: 0 }) => {
    try {
        const collection = dbo.collection(collectionName)
        const findResult = await collection.findOne(doc, { projection: projection })
        return findResult;
    } catch (error) {
        throw new Error(error.message)
    }
}

const incrementOne = async (collectionName, whrJSON, updatedDoc) => {
    try {
        const collection = dbo.collection(collectionName)
        const updatedData = await collection.updateOne(whrJSON, { $inc: updatedDoc })
        return updatedData
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { findAll, findOne, isExist, filteredDocs, insertOne, insertMany, updateMany, deleteMany, upsertOne, updateOne, count, findWithLimit, findOneAndUpdate, findOneWithProject, findWithAggregation, findWithAggregationwithLimit, findOneWithProjection, incrementOne }
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: process.env.AIEZE_COMMON_KAFKA_CLIENT_ID,
    brokers: process.env.AIEZE_COMMON_KAFKA_BROKERS.split(",")
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.AIEZE_COMMON_KAFKA_CONSUMER_GROUP_ID });


if (AIEZE_COMMON_KAFKA_ENABLE_PRODUCER) producer.connect()
if (AIEZE_COMMON_KAFKA_ENABLE_CONSUMER) consumer.connect()


async function subscribe(topic, partition = 0) {
    await consumer.subscribe({ topic, fromBeginning: true, partitions: [partition] });
}
  
async function unsubscribe(topic) {
    await consumer.unsubscribe(topic);
}
  
async function pause(topic, partition = 0) {
    await consumer.pause([{ topic, partition }]);
}
  
async function resume(topic, partition = 0) {
    await consumer.resume([{ topic, partition }]);
}
  
async function produce(topic, message, partition = null) {
    await producer.send({
      topic,
      messages: [{ value: message }],
      ...(partition && { partition })
    });
}

async function consume(callback) {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback({
          key: message.key ? message.key.toString() : null,
          value: message.value.toString(),
          headers: message.headers, 
          topic,
          partition
        });
      }
    });
}

module.exports = { subscribe, unsubscribe, pause, resume, produce, consume }
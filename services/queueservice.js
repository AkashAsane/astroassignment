const redisClient = require('../config/redis');

const enqueueRequest = async (clientId, requestData) => {
    const queueKey = `queue:${clientId}`;
    await redisClient.rPush(queueKey, JSON.stringify(requestData));
    
  
    await redisClient.publish('queue_notifications', clientId);
};

const dequeueRequest = async (clientId) => {
    const queueKey = `queue:${clientId}`;
    const request = await redisClient.lPop(queueKey);
    return request ? JSON.parse(request) : null;
};

module.exports = { enqueueRequest, dequeueRequest };

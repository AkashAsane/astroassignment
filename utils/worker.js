const { dequeueRequest } = require('../services/queueservice');
const redisClient = require('../config/redis');

const processQueue = async (clientId) => {
    let request;
    while (request = await dequeueRequest(clientId)) {
        console.log(`Processing request for client ${clientId}: ${request}`);
      
        await new Promise(res => setTimeout(res, 2000));  
    }
    console.log(`Queue for client ${clientId} is now empty`);
};


redisClient.subscribe('queue_notifications', (message) => {
    const clientId = message.toString();
    console.log(`Received notification to process queue for client: ${clientId}`);
    processQueue(clientId).catch(err => {
        console.error(`Error processing queue for client ${clientId}:`, err);
    });
});

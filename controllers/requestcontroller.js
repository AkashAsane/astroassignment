const redisClient = require('../config/redis'); 

const handleRequest = async (req, res) => {
    try {
        const queueKey = `queue:${req.user.id}`;
        const requestData = req.body.request;

      
        if (typeof requestData !== 'string') {
            return res.status(400).json({ message: 'Request data must be a string' });
        }

        await redisClient.rPush(queueKey, requestData);
        console.log(`User ID: ${req.user.id}`);
        return res.json({ message: 'Request added to queue successfully' });
    } catch (error) {
        console.error('Error adding request to queue:', error);
        return res.status(500).json({ message: 'Error adding request to queue' });
    }
};

const getQueueStatus = async (req, res) => {
    try {
        const queueKey = `queue:${req.user.id}`;
        
       
        const pong = await redisClient.ping();
        if (pong !== 'PONG') {
            return res.status(500).json({ message: 'Redis connection error' });
        }

        
        const length = await redisClient.lLen(queueKey);
        return res.json({ message: `Queue has ${length} item(s)` });

    } catch (error) {
        console.error('Error checking queue status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    handleRequest,
    getQueueStatus,
};

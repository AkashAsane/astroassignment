const express = require('express');
const { handleRequest,getQueueStatus } = require('../controllers/requestcontroller');
const router = express.Router();
const authMiddleware = require('../middleware/jwtauth');

router.post('/enqueue', authMiddleware, handleRequest);
router.get('/queue-status', authMiddleware, getQueueStatus);

module.exports = router;

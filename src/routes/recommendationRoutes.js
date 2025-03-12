const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');

// Route for getting recommendations
router.post('/', getRecommendations);

module.exports = router;

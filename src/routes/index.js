const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Route for testing database connection
router.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database connection error' });
        }
        res.json({ message: 'Database connection successful!', result: results[0] });
    });
});

// Importing all routes
const recommendationRoutes = require('./recommendationRoutes');
const userRoutes = require('./userRoutes'); 
const filterRoutes = require('./filterRoutes');

router.use('/users', userRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/filters', filterRoutes);

module.exports = router;

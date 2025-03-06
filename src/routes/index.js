const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database connection error' });
        }
        res.json({ message: 'Database connection successful!', result: results[0] });
    });
});

module.exports = router;
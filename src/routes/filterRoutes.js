const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route pour filtrer les produits
router.post('/', (req, res) => {
    const { category, priceRange } = req.body;
    let query = `SELECT * FROM products WHERE 1=1`;
    let params = [];

    if (category) {
        query += ` AND category = ?`;
        params.push(category);
    }

    if (priceRange && priceRange.min && priceRange.max) {
        query += ` AND price BETWEEN ? AND ?`;
        params.push(priceRange.min, priceRange.max);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la récupération des filtres", error: err });
        }
        res.json({ filteredProducts: results });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route GET pour récupérer tous les utilisateurs
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Route POST pour ajouter un utilisateur
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Le nom et l'email sont requis." });
    }

    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Utilisateur ajouté', id: result.insertId });
    });
});

module.exports = router;

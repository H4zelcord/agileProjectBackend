const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// Route test pour vérifier la connexion
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur de connexion' });
        }
        res.json({ message: 'Connexion réussie !', result: results[0] });
    });
});

// Lancer le serveur
app.listen(3000, () => {
    console.log('Serveur Node.js démarré sur http://localhost:3000');
});
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Utilisateur ajouté', id: result.insertId });
    });
});

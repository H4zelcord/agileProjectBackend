require('dotenv').config();
const mysql = require('mysql2');

// Création de la connexion MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Vérifier la connexion
db.connect((err) => {
    if (err) {
        console.error('❌ Error Connexion SQL :', err);
        return;
    }
    console.log('✅ Connected at the database MySQL');
});

module.exports = db;

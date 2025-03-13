const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const app = express();

dotenv.config();
app.use(express.json());
app.get('/api', (req, res) => {
    res.json({ message: 'API is running successfully.' });
});

// Utilisation des routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const db = require('./src/config/db');
const routes = require('./src/routes');

const app = express();
app.use(express.json());

// Use API Routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3001' })); // Allow cross origin requests but only from frontend port
app.use(express.json()); // Parse JSON bodies

// API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

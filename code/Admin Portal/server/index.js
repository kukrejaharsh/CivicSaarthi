// index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/issue', require('./routes/issue'));

// Define a simple root route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON body requests

// Routes
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/products');
app.use('/api/cart', cartRoutes);
app.use('/cart', cartRoutes); // Support /cart endpoint
app.use('/api/products', productRoutes);
app.use('/products', productRoutes); // Support /products endpoint

// Basic route
app.get('/', (req, res) => {
  res.send('E-Commerce Backend API');
});

// Custom 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.stack);
});

// Start server
app.listen(port, async () => {
  try {
    await poolPromise; // Ensure DB connection is established
    console.log('✅ Connected to Azure SQL DB');
    console.log(`🚀 Server running on port ${port}`);
  } catch (err) {
    console.error('Failed to connect to database:', err.stack);
    process.exit(1);
  }
});

const path = require('path');
app.use(express.static(path.join(__dirname, '../Frontend')));
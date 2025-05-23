require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { poolPromise } = require('./db');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON body requests

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/products');
app.use('/api/cart', cartRoutes);
app.use('/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/products', productRoutes);

// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
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
    await poolPromise;
    console.log('✅ Connected to Azure SQL DB');
    console.log(`🚀 Server running on port ${port}`);
  } catch (err) {
    console.error('Failed to connect to database:', err.stack);
    process.exit(1);
  }
});
require('dotenv').config();
const sql = require('mssql');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// ✅ Database config (your existing config)
const config = {
  user: 'himanshu3024',
  password: 'Himanshu#18',
  server: 'ecommercedatabas.database.windows.net',
  database: 'E-Commerce-Website-db',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000
  }
};

// ✅ Connect to database
async function connectToDatabase() {
  try {
    let pool = await sql.connect(config);
    console.log('Connected to database');
    return pool;
  } catch (err) {
    console.error('Database Connection Failed!', err);
    throw err;
  }
}

connectToDatabase();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Routes
const cartRoutes = require('./routes/cart');       // make sure this path is correct
const productRoutes = require('./routes/products'); // if you have it

app.use(express.json()); // To parse JSON body requests
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes); // if products.js exists

// ✅ Basic route
app.get('/', (req, res) => {
  res.send('E-Commerce Backend API');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// ✅ Export config so routes can use it
module.exports = config;

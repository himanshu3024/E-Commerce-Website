const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// View Cart Items (for UserID = 1 for now)
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT CartItems.CartItemID, Products.Name, Products.Price, CartItems.Quantity
      FROM CartItems
      JOIN Products ON CartItems.ProductID = Products.ProductID
      WHERE CartItems.UserID = 1
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).send('Server Error');
  }
});

// Add to Cart
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('productId', sql.Int, productId)
      .input('quantity', sql.Int, quantity)
      .query(`
        INSERT INTO CartItems (UserID, ProductID, Quantity)
        VALUES (1, @productId, @quantity)
      `);
    res.status(201).send('Item added to cart');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
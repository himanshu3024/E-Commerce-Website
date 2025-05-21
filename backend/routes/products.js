const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../db');

router.get('/', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

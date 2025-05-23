require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'himanshu3024',
  password: process.env.DB_PASSWORD || 'Himanshu#18',
  server: process.env.DB_SERVER || 'ecommercedatabas.database.windows.net',
  database: process.env.DB_NAME || 'E-Commerce-Website-db',
  options: {
    encrypt: true, // Required for Azure SQL
    enableArithAbort: true,
    trustServerCertificate: false,
    connectTimeout: 30000 // 30 seconds
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to Azure SQL DB');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed!', err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise
};
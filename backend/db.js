require('dotenv').config();
const sql = require('mssql');

const config = {
  user: 'himanshu3024',
  password: 'Himanshu#18',
  server: 'ecommercedatabas.database.windows.net',
  database: 'E-Commerce-Website-db',
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
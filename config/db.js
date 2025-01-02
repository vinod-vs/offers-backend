const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Azure SQL requires encryption
        trustServerCertificate: false // Set to true if you're using self-signed certificates
    }
};

const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to Azure SQL Database');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err.message);
        throw err;
    }
};

module.exports = { connectToDatabase, sql };

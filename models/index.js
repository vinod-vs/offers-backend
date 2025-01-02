const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Create a Sequelize instance for Azure SQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASS, // Password
  {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT || 1433, // Default Azure SQL port
    dialect: process.env.DB_DIALECT || 'mssql',
    dialectOptions: {
      options: {
        encrypt: true, // Enable encryption for Azure SQL
        trustServerCertificate: false,
      },
    },
    logging: false, // Disable SQL logging for cleaner console output
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to Azure SQL successfully'))
  .catch((err) => console.error('Unable to connect to Azure SQL:', err));

// Import Models
const User = require('./User')(sequelize, DataTypes);
const Deal = require('./Deal')(sequelize, DataTypes);

// Export models and Sequelize instance
module.exports = {
  sequelize,
  User,
  Deal,
};

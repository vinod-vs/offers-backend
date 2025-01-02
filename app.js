// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models'); // Import Sequelize instance from models
const userRoutes = require('./routes/user'); // Import user routes
const dealRoutes = require('./routes/deals'); // Import deal routes
require('dotenv').config(); // Load environment variables from .env

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api/users', userRoutes); // Routes for user-related operations
app.use('/api/deals', dealRoutes); // Routes for deal-related operations

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Deals API');
});


// Database Sync and Server Start
sequelize.sync({ force: true }) // Use force: true to drop and recreate tables
  .then(() => {
    console.log('Database connected and synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is runnin on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database or sync tables:', err);
  });

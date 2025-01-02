const { sequelize, Deal } = require('./models'); // Import the Deal model and sequelize instance

const seedDeals = async () => {
  try {
    await sequelize.authenticate(); // Ensure the database connection is working
    console.log('Connected to Azure SQL successfully');

    await Deal.bulkCreate([
      { title: '50% Off Shoes', description: 'Get 50% off on all running shoes for a limited time.', votes: 10 },
      { title: 'Buy 1 Get 1 Free', description: 'Available on selected clothing items.', votes: 5 },
    ]);

    console.log('Seed data added successfully');
    process.exit(0); // Exit the process
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedDeals();

const { sequelize, Deal } = require('./models'); // Import the Deal model and sequelize instance

const seedDeals = async () => {
  try {
    await sequelize.authenticate(); // Ensure the database connection is working
    console.log('Connected to Azure SQL successfully');

    await Deal.bulkCreate([
      { title: '50% Off Shoes', description: 'Get 50% off on all running shoes for a limited time.', url: 'https://www.ozbargain.com.au/node/888046', category: 'tag', votes: 10 },
    ]);

    console.log('Seed data added successfully');
    process.exit(0); // Exit the process
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedDeals();

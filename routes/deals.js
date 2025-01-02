const express = require('express');
const { Deal } = require('../models'); // Import Deal model
const router = express.Router();
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// Get all deals
router.get('/', async (req, res) => {
  try {
    const deals = await Deal.findAll();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch deals', details: err.message });
  }
});

// Create a new deal
router.post('/', async (req, res) => {
  const { title, url, couponCode, association, startDate, expiryDate, isFreebie, category, tags, description } = req.body;

  try {
    // Fetch the HTML content of the provided URL
    const response = await fetch(url);
    const html = await response.text();

    // Use cheerio to parse the HTML and extract the image
    const $ = cheerio.load(html);
    const imageUrl = $('meta[property="og:image"]').attr('content') || ''; // Extract Open Graph image

    // Save the deal with the extracted image URL
    const deal = await Deal.create({
      title,
      url,
      couponCode,
      association,
      startDate,
      expiryDate,
      isFreebie,
      category,
      tags,
      description,
      imageUrl,
      votes:0,
    });

    res.status(201).json(deal);
  } catch (err) {
    console.error('Error creating deal:', err);
    res.status(500).json({ error: 'Failed to create deal', details: err.message });
  }
});




// Get a single deal by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deal = await Deal.findByPk(id);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch deal', details: err.message });
  }
});

// Update a deal
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const deal = await Deal.findByPk(id);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    deal.title = title;
    deal.description = description;
    await deal.save();
    res.json({ message: 'Deal updated successfully', deal });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update deal', details: err.message });
  }
});

// Delete a deal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deal = await Deal.findByPk(id);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    await deal.destroy();
    res.json({ message: 'Deal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete deal', details: err.message });
  }
});

module.exports = router;

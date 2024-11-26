const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Listing = mongoose.connection.collection('listings');

// GET /api/listing - Fetch all listings
router.get('/listing', async (req, res) => {
  try {
    const listings = await Listing.find().toArray(); // Use .toArray() for native collection
    res.json(listings); // Return data as JSON
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Error fetching listings' });
  }
});

module.exports = router;

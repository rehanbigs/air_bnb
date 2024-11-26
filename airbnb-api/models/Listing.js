const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  id: String, // Match with the CSV column "id"
  name: String,
  description: String,
  property_type: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String], // This is stored as an array in MongoDB
  images: {
    picture_url: String, // Match with "picture_url" in CSV
  },
  address: {
    street: String, // Optional, as "street" is missing in the CSV
    suburb: String,
    country: String, // If available
  },
});

module.exports = mongoose.model('Listing', ListingSchema);

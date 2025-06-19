const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  distance: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  online: Boolean,
  category: String,
  store: storeSchema
});

module.exports = mongoose.model('Product', productSchema);

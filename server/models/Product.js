const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  online: Boolean,
  store: {
    name: String,
    lat: Number,
    lng: Number,
    distance: Number
  }
});

module.exports = mongoose.model('Product', productSchema);

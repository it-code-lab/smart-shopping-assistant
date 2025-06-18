const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Samsung Galaxy A14',
    price: 199,
    online: true,
    store: {
      name: 'Walmart Ottawa',
      lat: 45.4215,
      lng: -75.6972,
      distance: 2.5
    }
  },
  {
    name: 'HP Pavilion Laptop',
    price: 499,
    online: false,
    store: {
      name: 'Walmart Kanata',
      lat: 45.3000,
      lng: -75.9000,
      distance: 5.2
    }
  },
  {
    name: 'Apple AirPods',
    price: 129,
    online: true,
    store: {
      name: 'Walmart Nepean',
      lat: 45.3500,
      lng: -75.7500,
      distance: 3.8
    }
  }
];

const connectAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('✅ Sample products inserted successfully.');
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting sample products:', err);
    process.exit(1);
  }
};

connectAndSeed();

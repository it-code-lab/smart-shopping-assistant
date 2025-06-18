const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Samsung Galaxy A14 Phone',
    price: 199,
    online: true,
    category: 'phone',
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
    category: 'laptop',
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
    category: 'earbuds',
    store: {
      name: 'Walmart Nepean',
      lat: 45.3500,
      lng: -75.7500,
      distance: 3.8
    }
  },
  {
    name: 'Canon EOS Rebel T7 Camera',
    price: 449,
    online: true,
    category: 'camera',
    store: {
      name: 'Walmart Barrhaven',
      lat: 45.2730,
      lng: -75.7450,
      distance: 4.0
    }
  },
  {
    name: 'Apple MacBook Air M1',
    price: 999,
    online: true,
    category: 'laptop',
    store: {
      name: 'Walmart Orleans',
      lat: 45.4780,
      lng: -75.5120,
      distance: 7.0
    }
  },
  {
    name: 'Samsung Galaxy Tab A8 Tablet',
    price: 229,
    online: false,
    category: 'tablet',
    store: {
      name: 'Walmart Ottawa South',
      lat: 45.3780,
      lng: -75.6980,
      distance: 3.1
    }
  },
  {
    name: 'Sony WH-CH520 Headphones',
    price: 59,
    online: true,
    category: 'earbuds',
    store: {
      name: 'Walmart Westboro',
      lat: 45.3980,
      lng: -75.7350,
      distance: 2.2
    }
  },
  {
    name: 'Dell Inspiron 15 Laptop',
    price: 649,
    online: false,
    category: 'laptop',
    store: {
      name: 'Walmart Gloucester',
      lat: 45.4450,
      lng: -75.5900,
      distance: 6.2
    }
  },
  {
    name: 'Google Pixel 7a Phone',
    price: 479,
    online: true,
    category: 'phone',
    store: {
      name: 'Walmart Bayshore',
      lat: 45.3650,
      lng: -75.7990,
      distance: 4.9
    }
  },
  {
    name: 'Canon PIXMA Printer',
    price: 89,
    online: true,
    category: 'printer',
    store: {
      name: 'Walmart Merivale',
      lat: 45.3520,
      lng: -75.7380,
      distance: 3.4
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

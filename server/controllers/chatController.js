// // Placeholder logic: returns static products

// exports.handleChat = (req, res) => {
//   const query = req.body.query.toLowerCase();

//   const products = [
//     {
//       id: '1',
//       name: 'Samsung Galaxy A14',
//       price: 199,
//       online: true,
//       store: { name: 'Walmart Ottawa', distance: 2.5 }
//     },
//     {
//       id: '2',
//       name: 'HP Pavilion Laptop',
//       price: 499,
//       online: false,
//       store: { name: 'Walmart Kanata', distance: 5.2 }
//     }
//   ];

//   const results = products.filter(p => p.name.toLowerCase().includes(query));
//   res.json({ products: results });
// };

const Product = require('../models/Product');

exports.handleChat = async (req, res) => {
  const query = req.body.query.toLowerCase();

  try {
    const results = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).limit(10);

    res.json({ products: results });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

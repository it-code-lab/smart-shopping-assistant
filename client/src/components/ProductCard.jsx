import React from 'react';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <p>{product.online ? 'Available Online' : 'In-Store Only'}</p>
    {product.store && <p>Nearest Store: {product.store.name} ({product.store.distance} km)</p>}
  </div>
);

export default ProductCard;

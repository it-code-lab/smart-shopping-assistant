import React from 'react';

const highlightMatch = (text, keywords) => {
  if (!keywords || keywords.length === 0) return text;

  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
      <strong key={idx} className="highlight">{part}</strong>
    ) : (
      part
    )
  );
};

const ProductCard = ({ product, highlightTerms = [] }) => {
  return (
    <div className="product-card" style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
      <h3>{highlightMatch(product.name, highlightTerms)}</h3>
      <p><strong>Price:</strong> ${product.price}</p>
      <p>
        <strong>Availability:</strong> {product.online ? 'Online' : 'In-Store'}
        {!product.online && product.store?.name && (
          <> @ {product.store.name} (📍 {product.store.distance} km)</>
        )}
      </p>
    </div>
  );
};

export default ProductCard;

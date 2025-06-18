import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ChatBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.products);
  };

  return (
    <div className="chat-container">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by voice or text..." />
      <button onClick={handleSearch}>Search</button>
      <div className="results">{results.map((p, idx) => (
        <ProductCard key={p._id || idx} product={p} />
      ))}</div>
    </div>
  );
};

export default ChatBox;

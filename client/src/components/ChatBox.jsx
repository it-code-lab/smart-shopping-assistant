import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ChatBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [extracted, setExtracted] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setResults([]);
        setExtracted(null);
        return;
      }

      setExtracted(data.extracted);
      setResults(data.products || []);
      setErrorMsg('');
    } catch (err) {
      console.error("❌ API Error:", err);
      setErrorMsg('Failed to fetch results. Please try again.');
      setResults([]);
      setExtracted(null);
    }
  };

  return (
    <div className="chat-container">
        <h1>Smart Shopping Assistant</h1>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by voice or text..."
          rows={3}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '1rem',
            resize: 'vertical'
          }}
        />

        <button onClick={handleSearch}>Search</button>
      
      {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

      {extracted && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <strong>Query Details:</strong>
          <ul>
            <li><b>Category:</b> {extracted.category}</li>
            {extracted.price_max && <li><b>Max Price:</b> ${extracted.price_max}</li>}
            {extracted.features && extracted.features.length > 0 && (
              <li><b>Features:</b> {extracted.features.join(', ')}</li>
            )}
            {extracted.use_case && <li><b>Use Case:</b> {extracted.use_case}</li>}
            {typeof extracted.online_only === 'boolean' && (
              <li><b>Online Only:</b> {extracted.online_only ? 'Yes' : 'No'}</li>
            )}
          </ul>
        </div>
      )}

      <div className="results" style={{ marginTop: '20px' }}>
        {results.length > 0 ? (
          results.map((p, idx) => (
            <ProductCard
              key={p._id || idx}
              product={p}
              highlightTerms={[
                extracted?.category,
                ...(extracted?.features || []),
                extracted?.use_case,
              ].filter(Boolean)}
            />
          ))
        ) : (
          !errorMsg && extracted && <p>No matching products found.</p>
        )}
      </div>

    </div>
  );
};

export default ChatBox;

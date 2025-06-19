import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ChatBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [extracted, setExtracted] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [listening, setListening] = useState(false);

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

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="chat-container">
      <h1>Smart Shopping Assistant</h1>

      <div className="textarea-wrapper">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by voice or text..."
          rows={4}
        />
        <button
          className={`mic-button ${listening ? 'listening' : ''}`}
          onClick={handleVoiceInput}
          title="Click to speak"
        >
          <span style={{ fontSize: '1.3rem', display: 'block' }}>🎙️</span>
        </button>
      </div>

      <button className="submit-button" onClick={handleSearch}>Search</button>

      {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

      {extracted && (
        <div className="query-details">
          <strong>Query Details:</strong>
          <ul>
            <li><b>Category:</b> {extracted.category}</li>
            {extracted.price_max && <li><b>Max Price:</b> ${extracted.price_max}</li>}
            {extracted.features?.length > 0 && (
              <li><b>Features:</b> {extracted.features.join(', ')}</li>
            )}
            {extracted.use_case && <li><b>Use Case:</b> {extracted.use_case}</li>}
            {'online_only' in extracted && (
              <li><b>Online Only:</b> {extracted.online_only ? 'Yes' : 'No'}</li>
            )}
          </ul>
        </div>
      )}

      <div className="results">
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

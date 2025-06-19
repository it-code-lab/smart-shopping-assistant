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
      <div style={{ width: '100%', maxWidth: 700, position: 'relative' }}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by voice or text..."
          rows={3}
          style={{
            width: '80%',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '1rem',
            resize: 'vertical',
            margin: 'auto',
            marginBottom: '20px',
          }}
        />
        <button
          type="button"
          onClick={handleVoiceInput}
          title="Speak"
          style={{
            position: 'absolute',
            right: 40,
            top: 0,
            backgroundColor: listening ? '#dc3545' : '#007bff',
            border: 'none',
            width: 40,
            height: 40,
            padding: 0,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 0 8px rgba(0,0,0,0.2)'
          }}
        >
          🎤
        </button>
      </div>
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

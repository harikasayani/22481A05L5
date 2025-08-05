import React, { useState } from 'react';
import './Urlshortner.css';
export default function Urlshortner() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handle = async () => {
    setError('');
    setShortUrl('');
    if (!originalUrl) {
      setError('Enter URL to shorten');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to shorten URL'); 
      } else {
        setShortUrl(data.shortUrl);
      }
    } catch {
      setError('Unable to Shorten your URL');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'Arial, sans-serif', backgroundColor: 'orange', padding:50 }} className='shortener-form'>
      <h2 style={{color:'green'}}>URL Shortener</h2>
      <input
        type="text"
        className='input-tag'
        placeholder="Please enter your URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        style={{ width: '90%', padding: '8px', fontSize: '1rem' }}
      />
      <button onClick={handle} style={{ marginTop: 10, padding: '9px 12px', borderRadius: 10, outline:NaN, backgroundColor:'Green', border:NaN, color:'Pink' }}>
        Shorten URL
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && (
        <p>
          Short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

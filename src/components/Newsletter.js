import React, { useState } from 'react';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <div className="footer-section">
      <h3>Newsletter</h3>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn">Subscribe</button>
      </form>
    </div>
  );
}

export default Newsletter;
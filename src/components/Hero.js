import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>Summer Collection 2024</h1>
        <p>Discover the latest trends in fashion</p>
        <Link to="/products?category=summer" className="btn">Shop Now</Link>
      </div>
    </section>
  );
}

export default Hero;
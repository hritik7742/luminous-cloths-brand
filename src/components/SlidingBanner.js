import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SlidingBanner.css';
import sale from '../image/sale.png'
import newArrivals from '../image/collection.png'
import summerCollection from '../image/fashion.png'

const bannerImages = [
  summerCollection,
  newArrivals,
  sale,
];

function SlidingBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sliding-banner">
      <img src={bannerImages[currentImageIndex]} alt="Banner" />
      <div className="banner-content">
        {/* <h1>Discover Our Latest Collection</h1> */}
        {/* <Link to="/products" className="btn">Shop Now</Link> */}
      </div>
    </div>
  );
}

export default SlidingBanner;

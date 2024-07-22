import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SlidingBanner.css';
import shine from '../image/shinebright.png'
import glow from '../image/glow.png'
import flower from '../image/flower.png'

const bannerImages = [
  shine,
  glow,
  flower,
];

function Poster() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sliding-banner" style={{padding:"0 20px" }}>
      <img src={bannerImages[currentImageIndex]} alt="Banner" style={{borderRadius:'20px' ,objectFit:"contain",height:"-webkit-fill-available"}} />
      <div className="banner-content">
        {/* <h1>Discover Our Latest Collection</h1> */}
        {/* <Link to="/products" className="btn">Shop Now</Link> */}
      </div>
    </div>
  );
}

export default Poster;

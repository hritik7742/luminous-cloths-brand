
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendWhatsAppMessage } from '../Utils/whatsapp';
import './ProductCard.css';

function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [product]);

  const truncateTitle = (title, limit = 20) => {
    if (title.length > limit) {
      return title.slice(0, limit) + '...';
    }
    return title;
  };

  if (!product) {
    return <div className="product-card skeleton"></div>;
  }

  return (
    <div className="product-card">
      <div className="image-container">
        <Link to={`/product/${product.id}`} className="product-image-link">
          <div className={`skeleton-image ${imageLoaded ? 'hidden' : ''}`}></div>
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </Link>
      </div>
      <div className="product-info">
        <h3 className="product-title" title={product.name}>
          {imageLoaded ? truncateTitle(product.name) : <div className="skeleton-text"></div>}
        </h3>
        <p className="product-price">
          {imageLoaded ? `₹${product.price.toFixed(2)}` : <div className="skeleton-text"></div>}
        </p>
        <button 
          className={`whatsapp-btn ${imageLoaded ? '' : 'skeleton-button'}`}
          onClick={() => imageLoaded && sendWhatsAppMessage(product)}
          disabled={!imageLoaded}
        >
          {imageLoaded && (
            <>
              <i className="fab fa-whatsapp"></i> Inquire
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
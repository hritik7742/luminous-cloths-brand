// import React from 'react';
// import { Link } from 'react-router-dom';
// import { sendWhatsAppMessage } from '../Utils/whatsapp';
// import './ProductCard.css';

// function ProductCard({ product }) {
//   return (
//     <div className="product-card">
//       <Link to={`/product/${product.id}`}>
//         <img src={product.image} alt={product.name} />
//       </Link>
//       <div className="product-info">
//         <h3 className="product-title">{product.name}</h3>
//         <p className="product-price">${product.price.toFixed(2)}</p>
//         <button className="whatsapp-btn" onClick={() => sendWhatsAppMessage(product)}>
//           <i className="fab fa-whatsapp"></i> Inquire
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { sendWhatsAppMessage } from '../Utils/whatsapp';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">₹{product.price.toFixed(2)}</p>
        <button className="whatsapp-btn" onClick={() => sendWhatsAppMessage(product)}>
          <i className="fab fa-whatsapp"></i> Inquire
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

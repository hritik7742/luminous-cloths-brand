// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { sendWhatsAppMessage } from '../Utils/whatsapp';
// // import './ProductCard.css';

// // function ProductCard({ product }) {
// //   return (
// //     <div className="product-card">
// //       <Link to={`/product/${product.id}`}>
// //         <img src={product.image} alt={product.name} />
// //       </Link>
// //       <div className="product-info">
// //         <h3 className="product-title">{product.name}</h3>
// //         <p className="product-price">${product.price.toFixed(2)}</p>
// //         <button className="whatsapp-btn" onClick={() => sendWhatsAppMessage(product)}>
// //           <i className="fab fa-whatsapp"></i> Inquire
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductCard;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { sendWhatsAppMessage } from '../Utils/whatsapp';
// import './ProductCard.css';

// function ProductCard({ product }) {
//   return (
//     <div className="product-card">
//       <Link to={`/product/${product.id}`} className="product-image-link">
//         <img loading='lazy' src={product.image} alt={product.name} className="product-image" />
//       </Link>
//       <div className="product-info">
//         <h3 className="product-title">{product.name}</h3>
//         <p className="product-price">₹{product.price.toFixed(2)}</p>
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
  const truncateTitle = (title, limit = 20) => {
    if (title.length > limit) {
      return title.slice(0, limit) + '...';
    }
    return title;
  };

  return (
    <div className="product-card">
    <div className='image-div'> 
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img loading='lazy' src={product.image} alt={product.name} className="product-image" />
      </Link>
      </div>
      <div className="product-info">
        <h3 className="product-title" title={product.name}>
          {truncateTitle(product.name)}
        </h3>
        <p className="product-price">₹{product.price.toFixed(2)}</p>
        <button className="whatsapp-btn" onClick={() => sendWhatsAppMessage(product)}>
          <i className="fab fa-whatsapp"></i> Inquire
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
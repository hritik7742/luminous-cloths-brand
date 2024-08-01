


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../Admin/Firebase';
// import { sendWhatsAppMessage } from '../Utils/whatsapp';
// import './ProductDetail.css';

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productDoc = doc(db, 'products', id);
//         const productSnap = await getDoc(productDoc);
//         if (productSnap.exists()) {
//           setProduct({ id: productSnap.id, ...productSnap.data() });
//         } else {
//           setError('Product not found');
//         }
//       } catch (err) {
//         setError('Error fetching product');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//     window.scrollTo(0, 0);
//   }, [id]);

//   if (loading) return (
//     <div className="container loading-container">
//       <div className="loading-spinner"></div>
//     </div>
//   );

//   if (error) return <div className="container error-container">{error}</div>;
//   if (!product) return <div className="container error-container">Product not found</div>;

//   return (
//     <main className="product-detail">
//       <div className="container">
//         <div className="product-detail-content">
//           <div className="product-images">
//             <div className="main-image">
//               <img loading='lazy' src={product.image} alt={product.name} />
//             </div>
//             <div className="thumbnail-images">
//               {/* Add thumbnail images here if needed */}
//             </div>
//           </div>
//           <div className="product-info">
//             <h1>{product.name}</h1>
//             <p className="product-price">₹{product.price}</p>
//             <p className="product-code">Product Code: {product.productCode}</p>
//             <div className="product-rating">
//               <span className="rating">{product.rating} ★</span>
//               <span className="reviews">{product.ratingCount} Ratings, {product.reviewCount} Reviews</span>
//             </div>
//             <p className="delivery-info">Free Delivery</p>
//             <div className="size-selection">
//               <h3>Select Size</h3>
//               <div className="size-options">
//                 {product.sizes.map(size => (
//                   <button 
//                     key={size} 
//                     className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="product-details">
//               <h3>Product Details</h3>
//               <ul>
//                 <li>Name: {product.name}</li>
//                 {/* <li>Product Code: {product.productCode}</li> */}
//                 <div style={{ whiteSpace: 'pre-wrap' }}>{product.description}</div>
//               </ul>
//             </div>
//             <button className="btn whatsapp-btn" onClick={() => sendWhatsAppMessage(product)}>
//               <i className="fab fa-whatsapp"></i> Inquire on WhatsApp
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ProductDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../Admin/Firebase';
// import { sendWhatsAppMessage } from '../Utils/whatsapp';
// import { Helmet } from 'react-helmet';
// import './ProductDetail.css';

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productDoc = doc(db, 'products', id);
//         const productSnap = await getDoc(productDoc);
//         if (productSnap.exists()) {
//           setProduct({ id: productSnap.id, ...productSnap.data() });
//         } else {
//           setError('Product not found');
//         }
//       } catch (err) {
//         setError('Error fetching product');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//     window.scrollTo(0, 0);
//   }, [id]);

//   if (loading) return (
//     <div className="container loading-container">
//       <div className="loading-spinner"></div>
//     </div>
//   );

//   if (error) return <div className="container error-container">{error}</div>;
//   if (!product) return <div className="container error-container">Product not found</div>;

//   return (
//     <>
//       <Helmet>
//         <title>{product.seo?.title || product.name}</title>
//         <meta name="description" content={product.seo?.description || product.description} />
//         <meta name="keywords" content={product.seo?.keywords || ''} />
//       </Helmet>
//       <main className="product-detail">
//         <div className="container">
//           <div className="product-detail-content">
//             <div className="product-images">
//               <div className="main-image">
//                 <img loading='lazy' src={product.image} alt={product.name} />
//               </div>
//               <div className="thumbnail-images">
//                 {/* Add thumbnail images here if needed */}
//               </div>
//             </div>
//             <div className="product-info">
//               <h1>{product.name}</h1>
//               <p className="product-price">₹{product.price}</p>
//               <p className="product-code">Product Code: {product.productCode}</p>
//               <div className="product-rating">
//                 <span className="rating">{product.rating} ★</span>
//                 <span className="reviews">{product.ratingCount} Ratings, {product.reviewCount} Reviews</span>
//               </div>
//               <p className="delivery-info">Free Delivery</p>
//               <div className="size-selection">
//                 <h3>Select Size</h3>
//                 <div className="size-options">
//                   {product.sizes.map(size => (
//                     <button 
//                       key={size} 
//                       className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
//                       onClick={() => setSelectedSize(size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="product-details">
//                 <h3>Product Details</h3>
//                 <ul>
//                   <li>Name: {product.name}</li>
//                   <div style={{ whiteSpace: 'pre-wrap' }}>{product.description}</div>
//                 </ul>
//               </div>
//               <button className="btn whatsapp-btn" onClick={() => sendWhatsAppMessage(product)}>
//                 <i className="fab fa-whatsapp"></i> Inquire on WhatsApp
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default ProductDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Admin/Firebase';
import { sendWhatsAppMessage } from '../Utils/whatsapp';
import { Helmet } from 'react-helmet';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, 'products', id);
        const productSnap = await getDoc(productDoc);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="container loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return <div className="container error-container">{error}</div>;
  if (!product) return <div className="container error-container">Product not found</div>;

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={product.seo?.keywords || ''} />
      </Helmet>
      <main className="product-detail">
        <div className="container">
          <div className="product-detail-content">
            <div className="product-images">
              <div className="main-image">
                <img loading='lazy' src={product.image} alt={product.name} />
              </div>
              <div className="thumbnail-images">
                {/* Add thumbnail images here if needed */}
              </div>
            </div>
            <div className="product-info">
              <h1>{product.name}</h1>
              <p className="product-price">₹{product.price}</p>
              <p className="product-code">Product Code: {product.productCode}</p>
              <div className="product-rating">
                <span className="rating">{product.rating} ★</span>
                <span className="reviews">{product.ratingCount} Ratings, {product.reviewCount} Reviews</span>
              </div>
              <p className="delivery-info">Free Delivery</p>
              <div className="size-selection">
                <h3>Select Size</h3>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="product-details">
                <h3>Product Details</h3>
                <ul>
                  <li>Name: {product.name}</li>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{product.description}</div>
                </ul>
              </div>
              <button className="btn whatsapp-btn" onClick={() => sendWhatsAppMessage(product)}>
                <i className="fab fa-whatsapp"></i> Inquire on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetail;
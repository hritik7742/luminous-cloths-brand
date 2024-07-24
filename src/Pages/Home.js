

// import React, { useState, useEffect } from 'react';
// import { collection, onSnapshot, query, where, limit, doc, getDoc } from 'firebase/firestore';
// import { db } from '../Admin/Firebase';
// import SlidingBanner from '../components/SlidingBanner';
// import ProductCard from '../components/ProductCard';
// import './Home.css';
// import ProductDetail from './ProductDetail';
// import Poster from '../components/Poster';

// function Home() {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [westernProducts, setWesternProducts] = useState([]);
//   const [TraditionalProducts, setTraditionalProducts] = useState([]);
//   const [saleProducts, setSaleProducts] = useState([]);
//   const [specificProduct, setSpecificProduct] = useState(null);

//   const features = [
//     { icon: '🐘', text: 'MADE IN INDIA' },
//     { icon: '🏅', text: 'BEST QUALITY' },
//     { icon: '💳', text: 'SECURED PAYMENT' },
//     { icon: '🚚', text: 'FREE SHIPPING' },
//   ];


//   useEffect(() => {
//     // Fetch featured products
//     const featuredQuery = query(collection(db, 'products'), where('featured', '==', true), limit(4));
//     const unsubscribeFeatured = onSnapshot(featuredQuery, (snapshot) => {
//       const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setFeaturedProducts(products);
//     });

//     // Fetch western products
//     const westernQuery = query(collection(db, 'products'), where('category', '==', 'western'), limit(4));
//     const unsubscribeWestern = onSnapshot(westernQuery, (snapshot) => {
//       const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setWesternProducts(products);
//     });


//         // Fetch western products
//         const TraditionalQuery = query(collection(db, 'products'), where('category', '==', 'traditional'), limit(4));
//         const unsubscribeTraditional = onSnapshot(TraditionalQuery, (snapshot) => {
//           const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setTraditionalProducts(products);
//         });

//     // Fetch sale products
//     const saleQuery = query(collection(db, 'products'), where('category', '==', 'sale'), limit(4));
//     const unsubscribeSale = onSnapshot(saleQuery, (snapshot) => {
//       const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setSaleProducts(products);
//     });



//     // Cleanup subscriptions on unmount
//     return () => {
//       unsubscribeFeatured();
//       unsubscribeWestern();
//       unsubscribeSale();
//       unsubscribeTraditional();
//     };
//   }, []);

//   return (
//     <main>
//       <SlidingBanner />
//       <div className="featured-products">
//         <div className="container">
//           <h2>Featured Products</h2>
//           <div className="product-grid">
//             {featuredProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//       <section className="western-dresses">
//         <div className="container">
//           <h2 style={{textAlign:"left"}}>Western Dresses</h2>
//           <div className="product-grid">
//             {westernProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </section>
//       <section>
//       <div className="banner-container">
//       {features.map((feature, index) => (
//         <div key={index} className="feature-item">
//           <div className="feature-icon">{feature.icon}</div>
//           <div className="feature-text">{feature.text}</div>
//         </div>
//       ))}
//     </div>
//     </section>
//       <section className="sale-dresses">
//         <div className="container">
//           <h2 style={{textAlign:"left"}}>Sale Dresses</h2>
//           <div className="product-grid">
//             {saleProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </section>
    
//       <section className="Traditional-dresses">
//         <div className="container">
//           <h2 style={{textAlign:"left"}}>Traditional Dresses</h2>
//           <div className="product-grid">
//             {TraditionalProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </section>
//       <section>
//         <Poster/>
//       </section>
      
//     </main>
//   );
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../Admin/Firebase';
import SlidingBanner from '../components/SlidingBanner';
import ProductCard from '../components/ProductCard';
import './Home.css';
import './ProductDetail.css';
import Poster from '../components/Poster';
import { sendWhatsAppMessage } from '../Utils/whatsapp';
import Faq from '../components/Faq';
import Login from '../Admin/Login';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [westernProducts, setWesternProducts] = useState([]);
  const [TraditionalProducts, setTraditionalProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [specificProduct, setSpecificProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  window.scrollTo(0, 0);

  const features = [
    { icon: '🐘', text: 'MADE IN INDIA' },
    { icon: '🏅', text: 'BEST QUALITY' },
    { icon: '💳', text: 'SECURED PAYMENT' },
    { icon: '🚚', text: 'FREE SHIPPING' },
  ];

  useEffect(() => {
    // Fetch featured products
    const featuredQuery = query(collection(db, 'products'), where('featured', '==', true), limit(4));
    const unsubscribeFeatured = onSnapshot(featuredQuery, (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeaturedProducts(products);
    });

    // Fetch western products
    const westernQuery = query(collection(db, 'products'), where('category', '==', 'western'), limit(4));
    const unsubscribeWestern = onSnapshot(westernQuery, (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWesternProducts(products);
    });

    // Fetch traditional products
    const TraditionalQuery = query(collection(db, 'products'), where('category', '==', 'traditional'), limit(4));
    const unsubscribeTraditional = onSnapshot(TraditionalQuery, (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTraditionalProducts(products);
    });

    // Fetch sale products
    const saleQuery = query(collection(db, 'products'), where('category', '==', 'sale'), limit(4));
    const unsubscribeSale = onSnapshot(saleQuery, (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSaleProducts(products);
    });

    // Fetch specific product
    const fetchSpecificProduct = async () => {
      try {
        const productDoc = doc(db, 'products', 'iPBbAQwcrAvrH9wQvTks');
        const productSnap = await getDoc(productDoc);
        if (productSnap.exists()) {
          setSpecificProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          setError('Specific product not found');
        }
      } catch (err) {
        setError('Error fetching specific product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecificProduct();

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeFeatured();
      unsubscribeWestern();
      unsubscribeSale();
      unsubscribeTraditional();
    };
  }, []);

  return (
    <main>
      <SlidingBanner />
      <div className="featured-products">
        <div className="container">
          <h2>Collections</h2>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard  key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <section className="Traditional-dresses">
        <div className="container">
          <h2 style={{textAlign:"left"}}>Traditional </h2>
          <div className="product-grid">
            {TraditionalProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="banner-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">{feature.text}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="sale-dresses">
        <div className="container">
          <h2 style={{textAlign:"left"}}>Sale </h2>
          <div className="product-grid">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="western-dresses">
        <div className="container">
          <h2 style={{textAlign:"left"}}>Western </h2>
          <div className="product-grid">
            {westernProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <main className="product-detail">
        <div className="container">
          <div className="product-detail-content">
            {loading ? (
              <p style={{backgroundColor:"green"}}>Loading specific product...</p>
            ) : error ? (
              <p>{error}</p>
            ) : specificProduct ? (
              <>
                <div className="product-images">
                  <div className="main-image">
                    <img src={specificProduct.image} alt={specificProduct.name} />
                  </div>
                  <div className="thumbnail-images">
                    {/* Add thumbnail images here if available */}
                  </div>
                </div>
                <div className="product-info">
                  <h1>{specificProduct.name}</h1>
                  <p className="product-price">₹{specificProduct.price}</p>
                  <div className="product-rating">
                    <span className="rating">{specificProduct.rating} ★</span>
                    <span className="reviews">{specificProduct.ratingCount} Ratings, {specificProduct.reviewCount} Reviews</span>
                  </div>
                  <p className="delivery-info">Free Delivery</p>
                  <div className="size-selection">
                    <h3>Select Size</h3>
                    <div className="size-options">
                      {specificProduct.sizes && specificProduct.sizes.map(size => (
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
                      <li>Name: {specificProduct.name}</li>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{specificProduct.description}</div>
                    </ul>
                  </div>
                  <button className="btn whatsapp-btn" onClick={() => sendWhatsAppMessage(specificProduct)}>
                    <i className="fab fa-whatsapp"></i> Inquire on WhatsApp
                  </button>
                </div>
              </>
            ) : (
              <p>No specific product found</p>
            )}
          </div>
        </div>
      </main>
      <section>
        <Poster/>
      </section>
      <section>
        <Faq/>
      </section>
    

    </main>
  );
}

export default Home;
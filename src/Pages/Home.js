// import React from 'react';
// import SlidingBanner from '../components/SlidingBanner';
// import ProductCard from '../components/ProductCard';
// import { featuredProducts, saleProducts, traditionalProducts, westernProducts } from '../data/Products';
// import './Home.css';

// function Home() {
//   console.log("Featured Products:", featuredProducts);
//   console.log("Western Products:", westernProducts);

//   return (
//     <main>
//       <SlidingBanner />
//       <section className="featured-products">
//         <div className="container">
//           <h2>Featured Products</h2>
//           <div className="product-grid">
//             {featuredProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </section>
//       <section className="western-dresses">
//         <div className="container">
//           <h2>Western Dresses</h2>
//           <div className="product-grid">
//             {westernProducts.slice(0, 4).map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="western-dresses">
//         <div className="container">
//           <h2>sale Dresses</h2>
//           <div className="product-grid">
//             {saleProducts.slice(0, 4).map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
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
import ProductDetail from './ProductDetail';
import Poster from '../components/Poster';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [westernProducts, setWesternProducts] = useState([]);
  const [TraditionalProducts, setTraditionalProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [specificProduct, setSpecificProduct] = useState(null);

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


        // Fetch western products
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


        // Fetch a specific product
        const fetchSpecificProduct = async () => {
          const productId = '0FneWgv99igvcf58mULm' 
          const productDoc = doc(db, 'products', productId);
          const productSnap = await getDoc(productDoc);
          if (productSnap.exists()) {
            setSpecificProduct({ id: productSnap.id, ...productSnap.data() });
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
          <h2>Featured Products</h2>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <section className="western-dresses">
        <div className="container">
          <h2 style={{textAlign:"left"}}>Western Dresses</h2>
          <div className="product-grid">
            {westernProducts.map(product => (
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
          <h2 style={{textAlign:"left"}}>Sale Dresses</h2>
          <div className="product-grid">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section>
        {specificProduct && <ProductDetail product={specificProduct} />}
      </section> 
      <section className="Traditional-dresses">
        <div className="container">
          <h2 style={{textAlign:"left"}}>Traditional Dresses</h2>
          <div className="product-grid">
            {TraditionalProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <Poster/>
      </section>
      
    </main>
  );
}

export default Home;
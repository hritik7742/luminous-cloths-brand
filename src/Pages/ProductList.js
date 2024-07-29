
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import ProductFilter from './ProductFilter';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../Admin/Firebase';
// import './ProductList.css';
// import ProductNotFound from './ProductNotFound';

// function ProductList() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const category = searchParams.get('category');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
//       const productsList = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setAllProducts(productsList);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (category) {
//       const filtered = allProducts.filter(product =>
//         product.categories && product.categories.includes(category)
//       );
//       setCategoryProducts(filtered);
//       setFilteredProducts(filtered);
//     } else {
//       setCategoryProducts(allProducts);
//       setFilteredProducts(allProducts);
//     }
//   }, [category, allProducts]);

//   const handleFilterChange = (newFilteredProducts) => {
//     setFilteredProducts(newFilteredProducts);
//   };

//   return (
//     <main className="product-list">
//       <div className="container">
//         <h1>{getCategoryTitle(category)}</h1>
//         <ProductFilter 
//           allProducts={categoryProducts} 
//           onFilterChange={handleFilterChange} 
//           category={category}
//         />
//         {loading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <p> <ProductNotFound/></p>
//         ) : (
//           <div className="product-grid">
//             {filteredProducts.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// function getCategoryTitle(category) {
//   switch (category) {
//     case 'western':
//       return 'Western Products';
//     case 'traditional':
//       return 'Traditional Products';
//     case 'new-arrivals':
//       return 'New Arrivals';
//     case 'sale':
//       return 'Sale Products';
//     default:
//       return 'All Products';
//   }
// }

// export default ProductList;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilter from './ProductFilter';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Admin/Firebase';
import './ProductList.css';
import ProductNotFound from './ProductNotFound';

function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetFilters, setResetFilters] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllProducts(productsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = allProducts.filter(product =>
        product.categories && product.categories.includes(category)
      );
      setCategoryProducts(filtered);
      setFilteredProducts(filtered);
      setResetFilters(true); // Trigger filter reset when category changes
    } else {
      setCategoryProducts(allProducts);
      setFilteredProducts(allProducts);
      setResetFilters(true); // Trigger filter reset when returning to all products
    }
  }, [category, allProducts]);

  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <main className="product-list">
      <div className="container">
        <h1>{getCategoryTitle(category)}</h1>
        <ProductFilter
          allProducts={categoryProducts}
          onFilterChange={handleFilterChange}
          category={category}
          resetFilters={resetFilters}
          onResetComplete={() => setResetFilters(false)}
        />
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p><ProductNotFound /></p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function getCategoryTitle(category) {
  switch (category) {
    case 'western':
      return 'Western Products';
    case 'traditional':
      return 'Traditional Products';
    case 'new-arrivals':
      return 'New Arrivals';
    case 'sale':
      return 'Sale Products';
    default:
      return 'All Products';
  }
}

export default ProductList;
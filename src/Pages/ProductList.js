// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { allProducts } from '../data/Products';
// import './ProductList.css';

// function ProductList() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const category = searchParams.get('category');

//   const filteredProducts = allProducts.filter(product => {
//     if (category === 'western' || category === 'traditional') {
//       return product.category === category;
//     } else if (category === 'new-arrivals') {
//       return product.newArrival;
//     } else if (category === 'sale') {
//       return product.sale;
//     }
//     return true; // Show all products if no category is selected
//   });

//   const getCategoryTitle = () => {
//     switch (category) {
//       case 'western':
//         return 'Western Products';
//       case 'traditional':
//         return 'Traditional Products';
//       case 'new-arrivals':
//         return 'New Arrivals';
//       case 'sale':
//         return 'Sale Products';
//       default:
//         return 'All Products';
//     }
//   };

//   console.log("Current category:", category);
//   console.log("Filtered products:", filteredProducts);

//   return (
//     <main className="product-list">
//       <div className="container">
//         <h1>{getCategoryTitle()} </h1>
//         {filteredProducts.length === 0 ? (
//           <p>No products found in this category.</p>
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

// export default ProductList;





// src/pages/ProductList.js
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../Admin/Firebase';
// import './ProductList.css';

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const category = searchParams.get('category');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const querySnapshot = await getDocs(collection(db, 'products'));
//       const productsList = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setProducts(productsList);
//     };
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter(product => {
//     if (category === 'western' || category === 'traditional') {
//       return product.category === category;
//     } else if (category === 'new-arrivals') {
//       return product.newArrival;
//     } else if (category === 'sale') {
//       return product.sale;
//     }
//     return true;
//   });

//   const getCategoryTitle = () => {
//     switch (category) {
//       case 'western':
//         return 'Western Products';
//       case 'traditional':
//         return 'Traditional Products';
//       case 'new-arrivals':
//         return 'New Arrivals';
//       case 'sale':
//         return 'Sale Products';
//       default:
//         return 'All Products';
//     }
//   };

//   return (
//     <main className="product-list">
//       <div className="container">
//         <h1>{getCategoryTitle()}</h1>
//         {filteredProducts.length === 0 ? (
//           <p>No products found in this category.</p>
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

// export default ProductList;



// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../Admin/Firebase';
// import './ProductList.css';

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const category = searchParams.get('category');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
//       const productsList = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setProducts(productsList);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const filteredProducts = products.filter(product => {
//     if (category === 'western' || category === 'traditional') {
//       return product.category === category;
//     } else if (category === 'new-arrivals') {
//       return product.newArrival;
//     } else if (category === 'sale') {
//       return product.sale;
//     }
//     return true;
//   });

//   const getCategoryTitle = () => {
//     switch (category) {
//       case 'western':
//         return 'Western Products';
//       case 'traditional':
//         return 'Traditional Products';
//       case 'new-arrivals':
//         return 'New Arrivals';
//       case 'sale':
//         return 'Sale Products';
//       default:
//         return 'All Products';
//     }
//   };

//   return (
//     <main className="product-list">
//       <div className="container">
//         <h1>{getCategoryTitle()}</h1>
//         {filteredProducts.length === 0 ? (
//           <p>No products found in this category.</p>
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

// export default ProductList;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Admin/Firebase';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const filteredProducts = products.filter(product => {
    if (category === 'western' || category === 'traditional') {
      return product.category === category;
    } else if (category === 'new-arrivals') {
      return product.category === category;  // Ensure this is a boolean
    } else if (category === 'sale') {
      return product.category === category;  // Ensure this is a boolean
    }
    return true;
  });

  const getCategoryTitle = () => {
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
  };

  return (
    <main className="product-list">
      <div className="container">
        <h1>{getCategoryTitle()}</h1>
        {filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
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

export default ProductList;

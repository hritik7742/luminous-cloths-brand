

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './Pages/Home';
// import ProductList from './Pages/ProductList';
// import ProductDetail from './Pages/ProductDetail';
// import Admin from './Admin/Admin';
// import Loading from './Loading.js'// Make sure the path is correct
// import './App.css';

// function App() {
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   useEffect(() => {
//     const images = document.querySelectorAll('img');
//     let loadedCount = 0;

//     const checkIfAllImagesLoaded = () => {
//       loadedCount++;
//       if (loadedCount === images.length) {
//         setImagesLoaded(true);
//       }
//     };

//     images.forEach((image) => {
//       if (image.complete) {
//         checkIfAllImagesLoaded();
//       } else {
//         image.addEventListener('load', checkIfAllImagesLoaded);
//         image.addEventListener('error', checkIfAllImagesLoaded);
//       }
//     });
//   }, []);

//   return (
//     <Router>
//       <div className="site-wrapper">
//         {!imagesLoaded && <Loading />}
//         <Header />
//         <main className="site-content" style={{ display: imagesLoaded ? 'block' : 'none' }}>
//           <Routes>
//             <Route exact path="/" element={<Home />} />
//             <Route path="/products" element={<ProductList />} />
//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path="/admin" element={<Admin />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './Pages/Home';
// import ProductList from './Pages/ProductList';
// import ProductDetail from './Pages/ProductDetail';
// import Admin from './Admin/Admin';
// import Login from './Admin/Login'; // Make sure to create a Login component
// import Loading from './Loading'; // Make sure the path is correct
// import { auth } from './Admin/Firebase'; // Import Firebase auth

// import './App.css';

// function App() {
//   const [imagesLoaded, setImagesLoaded] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if images are loaded
//     const images = document.querySelectorAll('img');
//     let loadedCount = 0;

//     const checkIfAllImagesLoaded = () => {
//       loadedCount++;
//       if (loadedCount === images.length) {
//         setImagesLoaded(true);
//       }
//     };

//     images.forEach((image) => {
//       if (image.complete) {
//         checkIfAllImagesLoaded();
//       } else {
//         image.addEventListener('load', checkIfAllImagesLoaded);
//         image.addEventListener('error', checkIfAllImagesLoaded);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     // Set up Firebase authentication listener
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return () => unsubscribe();
//   }, []);

//   return (
//     <Router>
//       <div className="site-wrapper">
//         {!imagesLoaded && <Loading />}
//         <Header />
//         <main className="site-content" style={{ display: imagesLoaded ? 'block' : 'none' }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/products" element={<ProductList />} />
//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
//             <Route path="/login" element={<Login setUser={setUser} />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import ProductList from './Pages/ProductList';
import ProductDetail from './Pages/ProductDetail';
import Admin from './Admin/Admin';
import Login from './Admin/Login'; // Make sure to create a Login component
import Loading from './Loading'; // Make sure the path is correct
import { auth } from './Admin/Firebase'; // Import Firebase auth

import './App.css';

function Layout({ children }) {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login';

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="site-content">{children}</main>
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if images are loaded
    const images = document.querySelectorAll('img');
    let loadedCount = 0;

    const checkIfAllImagesLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach((image) => {
      if (image.complete) {
        checkIfAllImagesLoaded();
      } else {
        image.addEventListener('load', checkIfAllImagesLoaded);
        image.addEventListener('error', checkIfAllImagesLoaded);
      }
    });
  }, []);

  useEffect(() => {
    // Set up Firebase authentication listener
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="site-wrapper">
        {!imagesLoaded && <Loading />}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;

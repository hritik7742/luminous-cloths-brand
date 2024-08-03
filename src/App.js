

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
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

// function Layout({ children }) {
//   const location = useLocation();
//   const showHeaderFooter = location.pathname !== '/login';

//   return (
//     <>
//       {showHeaderFooter && <Header />}
//       <main className="site-content">{children}</main>
//       {showHeaderFooter && <Footer />}
//     </>
//   );
// }

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
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/products" element={<ProductList />} />
//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
//             <Route path="/login" element={<Login setUser={setUser} />} />
//           </Routes>
//         </Layout>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga'; // Import ReactGA for Google Analytics
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

// Initialize Google Analytics
ReactGA.initialize('G-BRKJDMPL8F'); // Replace with your tracking ID

function Layout({ children }) {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login';

  useEffect(() => {
    // Track page view
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="site-content">{children}</main>
      {/* {showHeaderFooter && <Footer />} */}
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


// // import React from 'react';
// // import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
// // import Home from './Pages/Home';
// // import ProductList from './Pages/ProductList';
// // import ProductDetail from './Pages/ProductDetail';


// // import './App.css';
// // import Admin from './Admin/Admin';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Header />
// //         <Routes>
// //           <Route exact path="/" element={<Home/>} />
// //           <Route path="/products" element={<ProductList/>} />
// //           <Route path="/product/:id" element={<ProductDetail/>} />
// //           <Route path="/admin" element={<Admin/>} />
// //         </Routes>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './Pages/Home';
// import ProductList from './Pages/ProductList';
// import ProductDetail from './Pages/ProductDetail';
// import Admin from './Admin/Admin';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="site-wrapper">
//         <Header />
//         <main className="site-content">
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

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import ProductList from './Pages/ProductList';
import ProductDetail from './Pages/ProductDetail';
import Admin from './Admin/Admin';
import Loading from './Loading.js'// Make sure the path is correct
import './App.css';

function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
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

  return (
    <Router>
      <div className="site-wrapper">
        {!imagesLoaded && <Loading />}
        <Header />
        <main className="site-content" style={{ display: imagesLoaded ? 'block' : 'none' }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


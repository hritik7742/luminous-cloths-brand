// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './Pages/Home';
// import ProductList from './Pages/ProductList';
// import ProductDetail from './Pages/ProductDetail';


// import './App.css';
// import Admin from './Admin/Admin';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           <Route exact path="/" element={<Home/>} />
//           <Route path="/products" element={<ProductList/>} />
//           <Route path="/product/:id" element={<ProductDetail/>} />
//           <Route path="/admin" element={<Admin/>} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import ProductList from './Pages/ProductList';
import ProductDetail from './Pages/ProductDetail';
import Admin from './Admin/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="site-wrapper">
        <Header />
        <main className="site-content">
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


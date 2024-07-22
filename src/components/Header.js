// // import Logo from '../image/logo.png'
// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link } from 'react-router-dom';
// // import { IoSearchOutline } from "react-icons/io5";
// // import { BsList } from "react-icons/bs";
// // import './Header.css';

// // function Header() {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const searchRef = useRef(null);

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   const toggleSearch = () => {
// //     setSearchOpen(!searchOpen);
// //     if (!searchOpen) {
// //       setTimeout(() => searchRef.current.focus(), 100);
// //     }
// //   };

// //   const handleSearchChange = (e) => {
// //     setSearchQuery(e.target.value);
// //     // Implement your search logic here
// //     // For this example, we'll use a dummy search function
// //     const dummySearch = (query) => {
// //       return ['Product 1', 'Product 2', 'Product 3'].filter(product => 
// //         product.toLowerCase().includes(query.toLowerCase())
// //       );
// //     };
// //     setSearchResults(dummySearch(e.target.value));
// //   };

// //   const handleClickOutside = (e) => {
// //     if (searchRef.current && !searchRef.current.contains(e.target)) {
// //       setSearchOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <header>
// //       <div className="container">
// //         <div className="header-top">
// //           <Link to="/" className="logo"><img style={{width:"70px",display:"flex",alignItems:"center"}} src={Logo}/></Link>
// //           <div className={`search-bar ${searchOpen ? 'open' : ''}`} ref={searchRef}>
// //             <input 
// //               type="text" 
// //               placeholder="Search products..." 
// //               value={searchQuery}
// //               onChange={handleSearchChange}
// //             />
// //             <button className="search-btn"><IoSearchOutline size={24} /></button>
// //           </div>
// //           <div className="header-actions">
// //             <button className="search-icon" onClick={toggleSearch}>
// //               <IoSearchOutline size={30} />
// //             </button>
// //             <button className="sidebar-icon" onClick={toggleSidebar}>
// //               <BsList size={40} />
// //             </button>
// //           </div>
// //         </div>
// //         <nav className="desktop-nav">
// //           <ul>
// //             <li><Link to="/">Home</Link></li>
// //             <li><Link to="/products?category=western">Western</Link></li>
// //             <li><Link to="/products?category=traditional">Traditional</Link></li>
// //             <li><Link to="/products?category=new-arrivals">New</Link></li>
// //             <li><Link to="/products?category=sale">Sale</Link></li>
// //           </ul>
// //         </nav>
// //       </div>

// //       {/* Sidebar */}
// //       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
// //         <button className="close-btn" onClick={toggleSidebar}>
// //           &times;
// //         </button>
// //         <ul>
// //           <li><Link to="/">Home</Link></li>
// //           <li><Link to="/about">About</Link></li>
// //           <li><Link to="/contact">Contact</Link></li>
// //           <li><Link to="/order-process">Order Process</Link></li>
// //           <li><Link to="/help-support">Help & Support</Link></li>
// //         </ul>
// //       </div>

// //       {/* Search Overlay */}
// //       {searchOpen && (
// //         <div className="search-overlay">
// //           <div className="search-results">
// //             {searchResults.map((result, index) => (
// //               <div key={index} className="search-result-item">{result}</div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // }

// // export default Header;
// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { IoSearchOutline } from "react-icons/io5";
// // import { BsList } from "react-icons/bs";
// // import './Header.css';
// // import Logo from '../image/logo.png';
// // import { collection, onSnapshot } from 'firebase/firestore';
// // import { db } from '../Admin/Firebase';

// // function Header() {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const searchRef = useRef(null);
// //   const navigate = useNavigate();
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
// //       const productsList = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setProducts(productsList);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   const toggleSearch = () => {
// //     setSearchOpen(!searchOpen);
// //     if (!searchOpen) {
// //       setTimeout(() => searchRef.current.focus(), 100);
// //     }
// //   };

// //   const handleSearchChange = (e) => {
// //     setSearchQuery(e.target.value);
// //     const filteredResults = products.filter(product =>
// //       product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
// //       product.description.toLowerCase().includes(e.target.value.toLowerCase())
// //     );
// //     setSearchResults(filteredResults);
// //   };

// //   const handleClickOutside = (e) => {
// //     if (searchRef.current && !searchRef.current.contains(e.target)) {
// //       setSearchOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   const handleSearchResultClick = (product) => {
// //     navigate(`/product/${product.id}`);
// //     setSearchOpen(false);
// //     setSearchQuery('');
// //     setSearchResults([]);
// //   };

// //   return (
// //     <header>
// //       <div className="container">
// //         <div className="header-top">
// //           <Link to="/" className="logo">
// //             <img src={Logo} alt="Logo" style={{ width: "70px", display: "flex", alignItems: "center" }} />
// //           </Link>
// //           <div className={`search-bar ${searchOpen ? 'open' : ''}`} ref={searchRef}>
// //             <input
// //               type="text"
// //               placeholder="Search products..."
// //               value={searchQuery}
// //               onChange={handleSearchChange}
// //             />
// //             <button className="search-btn">
// //               <IoSearchOutline size={24} />
// //             </button>
// //           </div>
// //           <div className="header-actions">
// //             <button className="search-icon" onClick={toggleSearch}>
// //               <IoSearchOutline size={30} />
// //             </button>
// //             <button className="sidebar-icon" onClick={toggleSidebar}>
// //               <BsList size={40} />
// //             </button>
// //           </div>
// //         </div>
// //         <nav className="desktop-nav">
// //           <ul>
// //             <li><Link to="/">Home</Link></li>
// //             <li><Link to="/products?category=western">Western</Link></li>
// //             <li><Link to="/products?category=traditional">Traditional</Link></li>
// //             <li><Link to="/products?category=new-arrivals">New</Link></li>
// //             <li><Link to="/products?category=sale">Sale</Link></li>
// //           </ul>
// //         </nav>
// //       </div>

// //       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
// //         <button className="close-btn" onClick={toggleSidebar}>
// //           &times;
// //         </button>
// //         <ul>
// //           <li><Link to="/">Home</Link></li>
// //           <li><Link to="/about">About</Link></li>
// //           <li><Link to="/contact">Contact</Link></li>
// //           <li><Link to="/order-process">Order Process</Link></li>
// //           <li><Link to="/help-support">Help & Support</Link></li>
// //         </ul>
// //       </div>
// //       {/* handleSearchResultClick(product) */}
// //       {searchOpen && (
// //         <div className="search-overlay">
// //           <div className="search-results">
// //             {searchResults.map(product => (
// //               <div onClick={() =>console.log("hello product")} key={product.id} style={{backgroundColor:"red"}} className="search-result-item" >
// //                 <img src={product.image} alt={product.name} className="search-result-image" />
// //                 <div className="search-result-info">
// //                   <p className="search-result-name">{product.name}</p>
// //                   <p className="search-result-description">{product.description.substring(0, 100)}...</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // }

// // export default Header;

// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { IoSearchOutline } from "react-icons/io5";
// // import { BsList } from "react-icons/bs";
// // import './Header.css';
// // import Logo from '../image/logo.png';
// // import { collection, onSnapshot } from 'firebase/firestore';
// // import { db } from '../Admin/Firebase';
// // import ProductCard from './ProductCard';

// // function Header() {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const searchRef = useRef(null);
// //   const navigate = useNavigate();
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
// //       const productsList = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setProducts(productsList);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   const toggleSearch = () => {
// //     setSearchOpen(!searchOpen);
// //     if (!searchOpen) {
// //       setTimeout(() => searchRef.current.focus(), 100);
// //     }
// //   };

// //   const handleSearchChange = (e) => {
// //     setSearchQuery(e.target.value);
// //     const filteredResults = products.filter(product =>
// //       product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
// //       product.description.toLowerCase().includes(e.target.value.toLowerCase())
// //     );
// //     setSearchResults(filteredResults);
// //   };

// //   const handleClickOutside = (e) => {
// //     if (searchRef.current && !searchRef.current.contains(e.target)) {
// //       setSearchOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   const handleSearchResultClick = (product) => {
// //     navigate(`/product/${product.id}`);
// //     setSearchOpen(false);
// //     setSearchQuery('');
// //     setSearchResults([]);
// //   };

// //   return (
// //     <header>
// //       <div className="container">
// //         <div className="header-top">
// //           <Link to="/" className="logo">
// //             <img src={Logo} alt="Logo" style={{ width: "70px", display: "flex", alignItems: "center" }} />
// //           </Link>
// //           <div className={`search-bar ${searchOpen ? 'open' : ''}`} ref={searchRef}>
// //             <input
// //               type="text"
// //               placeholder="Search products..."
// //               value={searchQuery}
// //               onChange={handleSearchChange}
// //             />
// //             <button className="search-btn">
// //               <IoSearchOutline size={24} />
// //             </button>
// //           </div>
// //           <div className="header-actions">
// //             <button className="search-icon" onClick={toggleSearch}>
// //               <IoSearchOutline size={30} />
// //             </button>
// //             <button className="sidebar-icon" onClick={toggleSidebar}>
// //               <BsList size={40} />
// //             </button>
// //           </div>
// //         </div>
// //         <nav className="desktop-nav">
// //           <ul>
// //             <li><Link to="/">Home</Link></li>
// //             <li><Link to="/products?category=western">Western</Link></li>
// //             <li><Link to="/products?category=traditional">Traditional</Link></li>
// //             <li><Link to="/products?category=new-arrivals">New</Link></li>
// //             <li><Link to="/products?category=sale">Sale</Link></li>
// //           </ul>
// //         </nav>
// //       </div>

// //       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
// //         <button className="close-btn" onClick={toggleSidebar}>
// //           &times;
// //         </button>
// //         <ul>
// //           <li><Link to="/">Home</Link></li>
// //           <li><Link to="/about">About</Link></li>
// //           <li><Link to="/contact">Contact</Link></li>
// //           <li><Link to="/order-process">Order Process</Link></li>
// //           <li><Link to="/help-support">Help & Support</Link></li>
// //         </ul>
// //       </div>
      
// //       {searchOpen && (
// //         <div className="search-overlay">
// //           <div className="search-results">
// //             {searchResults.map(product => (
// //               <div
// //                 onClick={() => handleSearchResultClick(product)}
// //                 key={product.id}
// //                 className="search-result-item"
// //               >
// //                 <ProductCard key={product.id} product={product} />
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // }

// // export default Header;

// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { IoSearchOutline } from "react-icons/io5";
// import { BsList } from "react-icons/bs";
// import './Header.css';
// import Logo from '../image/logo.png';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../Admin/Firebase';
// import ProductCard from './ProductCard';

// function Header() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const searchOverlayRef = useRef(null);


//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
//       const productsList = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setProducts(productsList);
//     });

//     return () => unsubscribe();
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen);
//     if (!searchOpen) {
//       setTimeout(() => searchRef.current.focus(), 100);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.trim() === '') {
//       setSearchResults([]);
//     } else {
//       const filteredResults = products.filter(product =>
//         product.name.toLowerCase().includes(query.toLowerCase()) ||
//         product.description.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(filteredResults);
//     }
//   };


//   const handleClickOutside = (e) => {
//     if (searchOverlayRef.current && !searchOverlayRef.current.contains(e.target)) {
//       setSearchOpen(false);
//     }
//   };
  


//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSearchResultClick = (product) => {
//     navigate(`/product/${product.id}`);
//     setSearchOpen(false);
//     setSearchQuery('');
//     setSearchResults([]);
//   };

//   return (
//     <header>
//       <div className="container">
//         <div className="header-top">
//           <Link to="/" className="logo">
//             <img src={Logo} alt="Logo" style={{ width: "70px", display: "flex", alignItems: "center" }} />
//           </Link>
//           <div className={`search-bar ${searchOpen ? 'open' : ''}`} ref={searchRef}>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <button className="search-btn">
//               <IoSearchOutline size={24} />
//             </button>
//           </div>
//           <div className="header-actions">
//             <button className="search-icon" onClick={toggleSearch}>
//               <IoSearchOutline size={30} />
//             </button>
//             <button className="sidebar-icon" onClick={toggleSidebar}>
//               <BsList size={40} />
//             </button>
//           </div>
//         </div>
//         <nav className="desktop-nav">
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/products?category=western">Western</Link></li>
//             <li><Link to="/products?category=traditional">Traditional</Link></li>
//             <li><Link to="/products?category=new-arrivals">New</Link></li>
//             <li><Link to="/products?category=sale">Sale</Link></li>
//           </ul>
//         </nav>
//       </div>

//       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//         <button className="close-btn" onClick={toggleSidebar}>
//           &times;
//         </button>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/contact">Contact</Link></li>
//           <li><Link to="/order-process">Order Process</Link></li>
//           <li><Link to="/help-support">Help & Support</Link></li>
//         </ul>
//       </div>
      
//       {searchOpen && searchQuery.trim() !== '' && (
//   <div className="search-overlay" ref={searchOverlayRef}>
//     <div className="search-results">
//       {searchResults.map(product => (
//         <div
//           onClick={() => handleSearchResultClick(product)}
//           key={product.id}
//           className="search-result-item"
//         >
//           <ProductCard key={product.id} product={product} />
//         </div>
//       ))}
//     </div>
//   </div>
// )}
//     </header>
//   );
// }

// export default Header;


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import './Header.css';
import Logo from '../image/logo.png';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Admin/Firebase';
import ProductCard from './ProductCard';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const searchOverlayRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchRef.current.focus(), 100);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) 
      );
      setSearchResults(filteredResults);
    }
  };


  const handleClickOutside = (e) => {
    if (searchOverlayRef.current && !searchOverlayRef.current.contains(e.target)) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchResultClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <header>
      <div className="container">
        <div className="header-top">
          <Link to="/" className="logo">
            <img src={Logo} alt="Logo" style={{ width: "70px", display: "flex", alignItems: "center" }} />
          </Link>
          <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
            <input
              type="text"
              ref={searchRef}
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-btn"  onClick={toggleSearch}>
              <IoSearchOutline size={24} />
            </button>
          </div>
          <div className="header-actions">
            <button className="search-icon" onClick={toggleSearch}>
              <IoSearchOutline size={30} />
            </button>
            <button className="sidebar-icon" onClick={toggleSidebar}>
              <BsList size={40} />
            </button>
          </div>
        </div>
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products?category=western">Western</Link></li>
            <li><Link to="/products?category=traditional">Traditional</Link></li>
            <li><Link to="/products?category=new-arrivals">New</Link></li>
            <li><Link to="/products?category=sale">Sale</Link></li>
          </ul>
        </nav>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <ul>
          <li><Link >Home</Link></li>
          <li><Link >About</Link></li>
          <li><Link >Contact</Link></li>
          <li><Link >Order Process</Link></li>
          <li><Link >Help & Support</Link></li>
        </ul>
      </div>

      {searchOpen && (
        <div className="search-overlay" ref={searchOverlayRef}>
          <div className="search-results">
            {searchResults.map(product => (
              <div
                onClick={() => handleSearchResultClick(product)}
                key={product.id}
                className="search-result-item"
              >
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

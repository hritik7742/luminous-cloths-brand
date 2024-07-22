// import React from 'react';
// import { Link } from 'react-router-dom';
// import Newsletter from './Newsletter';
// import './Footer.css';

// function Footer() {
//   return (
//     <footer>
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h3>Quick Links</h3>
//             <ul>
//               <li><Link to="/about">About Us</Link></li>
//               <li><Link to="/contact">Contact Us</Link></li>
//               <li><Link to="/faq">FAQs</Link></li>
//               <li><Link to="/return-policy">Return Policy</Link></li>
//             </ul>
//           </div>
//           <div className="footer-section">
//             <h3>Customer Service</h3>
//             <ul>
//               <li><Link to="/order-tracking">Order Tracking</Link></li>
//               <li><Link to="/size-guide">Size Guide</Link></li>
//               <li><Link to="/shipping-info">Shipping Info</Link></li>
//               <li><Link to="/gift-cards">Gift Cards</Link></li>
//             </ul>
//           </div>
//           <Newsletter />
//           <div className="footer-section">
//             <h3>Follow Us</h3>
//             <div className="social-icons">
//               <a href="#"><i className="fab fa-facebook"></i></a>
//               <a href="#"><i className="fab fa-instagram"></i></a>
//               <a href="#"><i className="fab fa-twitter"></i></a>
//               <a href="#"><i className="fab fa-pinterest"></i></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link>About Us</Link></li>
              <li><Link>Contact Us</Link></li>
              <li><Link>FAQs</Link></li>
              <li><Link>Return Policy</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><Link>Order Tracking</Link></li>
              <li><Link>Size Guide</Link></li>
              <li><Link>Shipping Info</Link></li>
              <li><Link>Gift Cards</Link></li>
            </ul>
          </div>
          <Newsletter />
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
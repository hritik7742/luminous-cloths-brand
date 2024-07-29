import React, { useState, useEffect } from 'react';
import './ProductFilter.css';

const ProductFilter = ({ allProducts, onFilterChange, category }) => {
  const [priceRange, setPriceRange] = useState(10000);
  const [ratings, setRatings] = useState([]);
  const [subcategory, setSubcategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  const categorySubcategories = {
    western: ['Dress', 'Top', 'Jeans', 'Skirt', 'Jacket'],
    traditional: ['Saree', 'Kurti', 'Lehenga', 'Salwar Kameez', 'Blouse'],
    'new-arrivals': ['Latest Collection', 'Trending', 'Seasonal'],
    sale: ['Clearance', 'Seasonal Offers', 'Limited Time Deal']
  };

  useEffect(() => {
    filterProducts();
  }, [priceRange, ratings, subcategory, sortOption, allProducts]);

  const filterProducts = () => {
    let filtered = allProducts.filter(product => {
      const priceMatch = product.price <= priceRange;
      const ratingMatch = ratings.length === 0 || ratings.includes(Math.floor(product.rating));
      const subcategoryMatch = subcategory === '' || 
        (Array.isArray(product.subcategories) && product.subcategories.includes(subcategory));

      return priceMatch && ratingMatch && subcategoryMatch;
    });

    // Apply sorting
    if (sortOption === 'priceLowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    onFilterChange(filtered);
  };

  const handlePriceChange = (value) => {
    setPriceRange(Number(value));
  };

  const handleRatingChange = (rating) => {
    setRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Get available subcategories based on the current category
  const availableSubcategories = category ? categorySubcategories[category] : [];

  return (
    <div className="product-filter">
      <div className="filter-section price-range">
        <label htmlFor="price-range">Select Price Range: ₹{priceRange}</label>
        <input
          id="price-range"
          type="range"
          min="0"
          max="10000"
          value={priceRange}
          onChange={(e) => handlePriceChange(e.target.value)}
        />
      </div>

      <div className="filter-section subcategory">
        <select value={subcategory} onChange={handleSubcategoryChange}>
          <option value="">All Subcategories</option>
          {availableSubcategories.map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      </div>

      <div className="filter-section sort">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="filter-summary">
        Showing {allProducts.length} products
      </div>
    </div>
  );
};

export default ProductFilter;
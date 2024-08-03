
import React from 'react';
import './ProductFilter.css';

const SubcategoryBoxes = ({ subcategories, selectedSubcategory, onSubcategoryChange }) => {
  return (
    <div className="subcategory-boxes">
      <button
        className={`subcategory-button ${selectedSubcategory === '' ? 'selected' : ''}`}
        onClick={() => onSubcategoryChange('')}
      >
        All
      </button>
      {subcategories.map((subcat) => (
        <button
          key={subcat}
          className={`subcategory-button ${selectedSubcategory === subcat ? 'selected' : ''}`}
          onClick={() => onSubcategoryChange(subcat)}
        >
          {subcat}
        </button>
      ))}
    </div>
  );
};

export default SubcategoryBoxes;
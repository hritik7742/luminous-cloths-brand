


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, deleteDoc, doc, onSnapshot, getDoc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import imageCompression from 'browser-image-compression';
import './Admin.css';

function Admin() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    categories: [],
    subcategories: [],
    description: '',
    rating: '',
    ratingCount: '',
    reviewCount: '',
    sizes: [],
    productCode: '',
    createdBy: ''
  });

  const [seo, setSeo] = useState({
    title: '',
    description: '',
    keywords: '',
  });

  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [showImageWarning, setShowImageWarning] = useState(false);

  const categorySubcategories = {
    western: ['Dress', 'Top', 'Jeans', 'Skirt', 'Jacket'],
    traditional: ['Saree', 'Kurti', 'Lehenga', 'Salwar Kameez', 'Blouse'],
    'new-arrivals': ['Latest Collection', 'Trending', 'Seasonal'],
    sale: ['Clearance', 'Seasonal Offers', 'Limited Time Deal']
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      let productsQuery;
      if (user.email === 'hritikchoudharykota@gmail.com') {
        productsQuery = collection(db, 'products');
      } else {
        productsQuery = query(collection(db, 'products'), where('createdBy', '==', user.email));
      }

      const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
        const productsList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            sizes: data.sizes || [],
            categories: data.categories || [],
            subcategories: data.subcategories || []
          };
        });
        setProducts(productsList);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSeoChange = (e) => {
    setSeo({ ...seo, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };

      const compressedFile = await imageCompression(file, options);
      setImageFile(compressedFile);
      setImageUploaded(true);
      setShowImageWarning(false);
    } catch (error) {
      console.error('Error compressing image:', error);
      setImageFile(file);  // Use original file if compression fails
      setImageUploaded(true);
      setShowImageWarning(false);
    }
  };

  const handleSizeChange = (size) => {
    const updatedSizes = product.sizes.includes(size)
      ? product.sizes.filter(s => s !== size)
      : [...product.sizes, size];
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = product.categories.includes(category)
      ? product.categories.filter(c => c !== category)
      : [...product.categories, category];
    
    const updatedSubcategories = updatedCategories.length === 0 ? [] : product.subcategories.filter(sub => 
      updatedCategories.some(cat => categorySubcategories[cat].includes(sub))
    );
    
    setProduct({ ...product, categories: updatedCategories, subcategories: updatedSubcategories });
  };

  const handleSubcategoryChange = (subcategory) => {
    const updatedSubcategories = product.subcategories.includes(subcategory)
      ? product.subcategories.filter(s => s !== subcategory)
      : [...product.subcategories, subcategory];
    setProduct({ ...product, subcategories: updatedSubcategories });
  };

  const generateProductCode = async () => {
    const latestCodeDoc = doc(db, 'metadata', 'latestProductCode');
    const latestCodeSnap = await getDoc(latestCodeDoc);
    
    let newProductCode;
    if (latestCodeSnap.exists()) {
      const latestCode = latestCodeSnap.data().code;
      newProductCode = (parseInt(latestCode) + 1).toString().padStart(5, '0');
    } else {
      newProductCode = '00001';
    }

    await setDoc(latestCodeDoc, { code: newProductCode });
    return newProductCode;
  };

  const handleEdit = (product) => {
    setProduct({
      ...product,
      categories: product.categories || [],
      subcategories: product.subcategories || [],
    });
    setSeo(product.seo || { title: '', description: '', keywords: '' });
    setEditMode(true);
    setEditId(product.id);
    setImageUploaded(!!product.image);
    window.scrollTo(0, 0);
  };

  const handleAddOrUpdateProduct = async () => {
    if (!imageUploaded && !product.image) {
      setShowImageWarning(true);
      return;
    }

    try {
      let imageUrl = product.image;
      if (imageFile) {
        const imageRef = ref(storage, `product-images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const productData = {
        ...product,
        image: imageUrl,
        price: parseFloat(product.price),
        rating: parseFloat(product.rating),
        ratingCount: parseInt(product.ratingCount),
        reviewCount: parseInt(product.reviewCount),
        categories: product.categories,
        subcategories: product.subcategories,
        createdBy: user.email,
        seo: seo,
      };

      if (editMode) {
        await updateDoc(doc(db, 'products', editId), productData);
        alert('Product updated successfully!');
      } else {
        const productCode = await generateProductCode();
        await addDoc(collection(db, 'products'), {
          ...productData,
          productCode: productCode
        });
        alert('Product added successfully!');
      }

      setProduct({
        name: '',
        price: '',
        image: '',
        categories: [],
        subcategories: [],
        description: '',
        rating: '',
        ratingCount: '',
        reviewCount: '',
        sizes: [],
        productCode: '',
        createdBy: ''
      });
      setSeo({
        title: '',
        description: '',
        keywords: '',
      });
      setImageFile(null);
      setImageUploaded(false);
      setShowImageWarning(false);
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="form-container">
        <h2>{editMode ? 'Edit Product' : 'Add Product'}</h2>
        <div className="input-group">
          <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className={`upload-label ${imageUploaded ? 'uploaded' : ''}`} htmlFor="image-upload">
            {imageUploaded ? 'Image Uploaded' : 'Upload Image'}
          </label>
          <input id="image-upload" type="file" name="image" onChange={handleImageChange} />
        </div>
        {showImageWarning && (
          <p className="image-warning">Please upload an image before adding/updating the product.</p>
        )}
        <div className="input-group">
          <div className="categories-container">
            {Object.keys(categorySubcategories).map(category => (
              <label key={category} className="category-label">
                <input 
                  type="checkbox" 
                  id={`category-${category}`}
                  name="categories" 
                  value={category} 
                  checked={product.categories.includes(category)} 
                  onChange={() => handleCategoryChange(category)} 
                />
                <span className="checkmark"></span>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="input-group">
          <div className="subcategories-container">
            {product.categories.map(category => (
              <div key={category}>
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)} Subcategories:</h4>
                {categorySubcategories[category].map(subcategory => (
                  <label key={subcategory} className="subcategory-label">
                    <input 
                      type="checkbox" 
                      id={`subcategory-${subcategory}`}
                      name="subcategories" 
                      value={subcategory} 
                      checked={product.subcategories.includes(subcategory)} 
                      onChange={() => handleSubcategoryChange(subcategory)} 
                    />
                    <span className="checkmark"></span>
                    {subcategory}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="input-group">
          <textarea 
            name="description" 
            placeholder="Description (You can use custom formatting)" 
            value={product.description} 
            onChange={handleChange}
            rows="10"
          ></textarea>
        </div>
        <div className="input-group">
          <input type="number" name="rating" placeholder="Rating" value={product.rating} onChange={handleChange} step="0.1" min="0" max="5" />
        </div>
        <div className="input-group">
          <input type="number" name="ratingCount" placeholder="Rating Count" value={product.ratingCount} onChange={handleChange} min="0" />
        </div>
        <div className="input-group">
          <input type="number" name="reviewCount" placeholder="Review Count" value={product.reviewCount} onChange={handleChange} min="0" />
        </div>
        <div className="input-group">
          <div className="sizes-container">
            {['S', 'M', 'L', 'XL'].map(size => (
              <label key={size} className="size-label">
                <input 
                  type="checkbox" 
                  name="sizes" 
                  value={size} 
                  checked={product.sizes.includes(size)} 
                  onChange={() => handleSizeChange(size)} 
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        <div className="seo-section">
          <h3>SEO Information</h3>
          <div className="input-group">
            <input 
              type="text" 
              name="title" 
              placeholder="SEO Title" 
              value={seo.title} 
              onChange={handleSeoChange} 
            />
          </div>
          <div className="input-group">
            <textarea 
              name="description" 
              placeholder="SEO Description" 
              value={seo.description} 
              onChange={handleSeoChange}
              rows="3"
            ></textarea>
          </div>
          <div className="input-group">
            <input 
              type="text" 
              name="keywords" 
              placeholder="SEO Keywords (comma-separated)" 
              value={seo.keywords} 
              onChange={handleSeoChange} 
            />
          </div>
        </div>
        <button onClick={handleAddOrUpdateProduct} className="add-product-button">
          {editMode ? 'Update Product' : 'Add Product'}
        </button>
        {editMode && (
          <button onClick={() => {
            setEditMode(false);
            setEditId(null);
            setProduct({
              name: '',
              price: '',
              image: '',
              categories: [],
              subcategories: [],
              description: '',
              rating: '',
              ratingCount: '',
              reviewCount: '',
              sizes: [],
              productCode: '',
              createdBy: ''
            });
            setSeo({
              title: '',
              description: '',
              keywords: '',
            });
            setImageUploaded(false);
            setShowImageWarning(false);
          }} className="cancel-edit-button">
            Cancel Edit
          </button>
        )}
      </div>
      <div className="product-list">
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div className="product-info">
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price.toFixed(2)}</p>
                  <p>Categories: {product.categories.join(', ')}</p>
                  <p>Subcategories: {product.subcategories.join(', ')}</p>
                  <p>Product Code: {product.productCode}</p>
                  <p>Rating: {product.rating} ★ ({product.ratingCount} ratings, {product.reviewCount} reviews)</p>
                  <p>Sizes: {product.sizes.join(', ')}</p>
                  <p>Created By: {product.createdBy}</p>
                  <p>SEO Title: {product.seo?.title || 'N/A'}</p>
                  <p>SEO Keywords: {product.seo?.keywords || 'N/A'}</p>
                </div>
              </div>
              <div className='action-btn-admin'>
                <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
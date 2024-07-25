

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { collection, addDoc, deleteDoc, doc, onSnapshot, getDoc, setDoc, updateDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage, auth } from './Firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import imageCompression from 'browser-image-compression';
// import './Admin.css';

// function Admin() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         navigate('/login');
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       navigate('/login');
//     }).catch((error) => {
//       console.error('Logout error:', error);
//     });
//   };

//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     image: '',
//     category: '',
//     description: '',
//     rating: 0,
//     ratingCount: '',
//     reviewCount: '',
//     sizes: [],
//     productCode: ''
//   });
//   const [products, setProducts] = useState([]);
//   const [imageFile, setImageFile] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => { 
//     const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
//       const productsList = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           ...data,
//           sizes: data.sizes || []
//         };
//       });
//       setProducts(productsList);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const options = {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 1920,
//         useWebWorker: true
//       };

//       const compressedFile = await imageCompression(file, options);
//       setImageFile(compressedFile);
//     } catch (error) {
//       console.error('Error compressing image:', error);
//       setImageFile(file);  // Use original file if compression fails
//     }
//   };

//   const handleSizeChange = (size) => {
//     const updatedSizes = product.sizes.includes(size)
//       ? product.sizes.filter(s => s !== size)
//       : [...product.sizes, size];
//     setProduct({ ...product, sizes: updatedSizes });
//   };

//   const generateProductCode = async () => {
//     const latestCodeDoc = doc(db, 'metadata', 'latestProductCode');
//     const latestCodeSnap = await getDoc(latestCodeDoc);
    
//     let newProductCode;
//     if (latestCodeSnap.exists()) {
//       const latestCode = latestCodeSnap.data().code;
//       newProductCode = (parseInt(latestCode) + 1).toString().padStart(5, '0');
//     } else {
//       newProductCode = '00001';
//     }

//     await setDoc(latestCodeDoc, { code: newProductCode });
//     return newProductCode;
//   };

//   const handleEdit = (product) => {
//     setProduct(product);
//     setEditMode(true);
//     setEditId(product.id);
//     window.scrollTo(0, 0);
//   };

//   const handleAddOrUpdateProduct = async () => {
//     try {
//       let imageUrl = product.image;
//       if (imageFile) {
//         const imageRef = ref(storage, `product-images/${imageFile.name}`);
//         await uploadBytes(imageRef, imageFile);
//         imageUrl = await getDownloadURL(imageRef);
//       }

//       const productData = {
//         ...product,
//         image: imageUrl,
//         price: parseFloat(product.price),
//         rating: parseFloat(product.rating),
//         ratingCount: parseInt(product.ratingCount),
//         reviewCount: parseInt(product.reviewCount),
//       };

//       if (editMode) {
//         await updateDoc(doc(db, 'products', editId), productData);
//         alert('Product updated successfully!');
//       } else {
//         const productCode = await generateProductCode();
//         await addDoc(collection(db, 'products'), {
//           ...productData,
//           productCode: productCode
//         });
//         alert('Product added successfully!');
//       }

//       setProduct({
//         name: '',
//         price: '',
//         image: '',
//         category: '',
//         description: '',
//         rating: 0,
//         ratingCount: 0,
//         reviewCount: 0,
//         sizes: [],
//         productCode: ''
//       });
//       setImageFile(null);
//       setEditMode(false);
//       setEditId(null);
//     } catch (error) {
//       console.error('Error adding/updating product:', error);
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'products', id));
//       alert('Product deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <button style={{padding:"10px 30px 10px 30px" , background:"#007bff",border:"none", color:"white" ,borderRadius:"5px"}} onClick={handleLogout}>Logout</button>
//       <div className="form-container">
//         <h2>{editMode ? 'Edit Product' : 'Add Product'}</h2>
//         <div className="input-group">
//           <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
//         </div>
//         <div className="input-group">
//           <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
//         </div>
//         <div className="input-group">
//           <label className="upload-label" htmlFor="image-upload">Upload Image</label>
//           <input id="image-upload" type="file" name="image" onChange={handleImageChange} />
//         </div>
//         <div className="input-group">
//           <select name="category" value={product.category} onChange={handleChange}>
//             <option value="">Select Category</option>
//             <option value="western">Western</option>
//             <option value="traditional">Traditional</option>
//             <option value="new-arrivals">New Arrivals</option>
//             <option value="sale">Sale</option>
//           </select>
//         </div>
//         <div className="input-group">
//           <textarea 
//             name="description" 
//             placeholder="Description (You can use custom formatting)" 
//             value={product.description} 
//             onChange={handleChange}
//             rows="10"
//           ></textarea>
//         </div>
//         <div className="input-group">
//           <input type="number" name="rating" placeholder="Rating" value={product.rating} onChange={handleChange} step="0.1" min="0" max="5" />
//         </div>
//         <div className="input-group">
//           <input type="number" name="ratingCount" placeholder="Rating Count" value={product.ratingCount} onChange={handleChange} min="0" />
//         </div>
//         <div className="input-group">
//           <input type="number" name="reviewCount" placeholder="Review Count" value={product.reviewCount} onChange={handleChange} min="0" />
//         </div>
//         <div className="input-group">
//           <div className="sizes-container">
//             {['S', 'M', 'L', 'XL'].map(size => (
//               <label key={size} className="size-label">
//                 <input 
//                   type="checkbox" 
//                   name="sizes" 
//                   value={size} 
//                   checked={product.sizes.includes(size)} 
//                   onChange={() => handleSizeChange(size)} 
//                 />
//                 {size}
//               </label>
//             ))}
//           </div>
//         </div>
//         <button onClick={handleAddOrUpdateProduct} className="add-product-button">
//           {editMode ? 'Update Product' : 'Add Product'}
//         </button>
//         {editMode && (
//           <button onClick={() => {
//             setEditMode(false);
//             setEditId(null);
//             setProduct({
//               name: '',
//               price: '',
//               image: '',
//               category: '',
//               description: '',
//               rating: 0,
//               ratingCount: 0,
//               reviewCount: 0,
//               sizes: [],
//               productCode: ''
//             });
//           }} className="cancel-edit-button">
//             Cancel Edit
//           </button>
//         )}
//       </div>
//       <div className="product-list">
//         <h2>Product List</h2>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               <div className="product-info">
//                 <img src={product.image} alt={product.name} />
//                 <div>
//                   <h3>{product.name}</h3>
//                   <p>Price: ₹{product.price.toFixed(2)}</p>
//                   <p>Category: {product.category}</p>
//                   <p>Product Code: {product.productCode}</p>
//                   <p>Rating: {product.rating} ★ ({product.ratingCount} ratings, {product.reviewCount} reviews)</p>
//                   <p>Sizes: {product.sizes.join(', ')}</p>
//                 </div>
//               </div>
//               <div className='action-btn-admin'>
//               <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
//               <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Admin;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, deleteDoc, doc, onSnapshot, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import imageCompression from 'browser-image-compression';
import './Admin.css';

function Admin() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    categories: [],
    description: '',
    rating: 0,
    ratingCount: '',
    reviewCount: '',
    sizes: [],
    productCode: ''
  });
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => { 
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          sizes: data.sizes || [],
          categories: data.categories || []
        };
      });
      setProducts(productsList);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
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
    } catch (error) {
      console.error('Error compressing image:', error);
      setImageFile(file);  // Use original file if compression fails
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
    setProduct({ ...product, categories: updatedCategories });
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
    });
    setEditMode(true);
    setEditId(product.id);
    window.scrollTo(0, 0);
  };

  const handleAddOrUpdateProduct = async () => {
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
        description: '',
        rating: 0,
        ratingCount: 0,
        reviewCount: 0,
        sizes: [],
        productCode: ''
      });
      setImageFile(null);
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
      <button style={{padding:"10px 30px 10px 30px" , background:"#007bff",border:"none", color:"white" ,borderRadius:"5px"}} onClick={handleLogout}>Logout</button>
      <div className="form-container">
        <h2>{editMode ? 'Edit Product' : 'Add Product'}</h2>
        <div className="input-group">
          <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="upload-label" htmlFor="image-upload">Upload Image</label>
          <input id="image-upload" type="file" name="image" onChange={handleImageChange} />
        </div>
        <div className="input-group">
          <div className="categories-container">
            {['western', 'traditional', 'new-arrivals', 'sale'].map(category => (
              <label key={category} className="category-label">
                <input 
                  type="checkbox" 
                  name="categories" 
                  value={category} 
                  checked={product.categories.includes(category)} 
                  onChange={() => handleCategoryChange(category)} 
                />
                {category}
              </label>
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
              description: '',
              rating: 0,
              ratingCount: 0,
              reviewCount: 0,
              sizes: [],
              productCode: ''
            });
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
                  <p>Product Code: {product.productCode}</p>
                  <p>Rating: {product.rating} ★ ({product.ratingCount} ratings, {product.reviewCount} reviews)</p>
                  <p>Sizes: {product.sizes.join(', ')}</p>
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
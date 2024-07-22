// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage } from './Firebase';
// import './Admin.css';

// function Admin() {
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     image: '',
//     category: '',
//     description: '',
//     rating: 0,
//     ratingCount: '',
//     reviewCount: '',
//     sizes: []
//   });
//   const [products, setProducts] = useState([]);
//   const [imageFile, setImageFile] = useState(null);

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

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSizeChange = (size) => {
//     const updatedSizes = product.sizes.includes(size)
//       ? product.sizes.filter(s => s !== size)
//       : [...product.sizes, size];
//     setProduct({ ...product, sizes: updatedSizes });
//   };

//   const handleAddProduct = async () => {
//     try {
//       let imageUrl = '';
//       if (imageFile) {
//         const imageRef = ref(storage, `product-images/${imageFile.name}`);
//         await uploadBytes(imageRef, imageFile);
//         imageUrl = await getDownloadURL(imageRef);
//       }

//       await addDoc(collection(db, 'products'), {
//         ...product,
//         image: imageUrl,
//         price: parseFloat(product.price),
//         rating: parseFloat(product.rating),
//         ratingCount: parseInt(product.ratingCount),
//         reviewCount: parseInt(product.reviewCount)
//       });
//       alert('Product added successfully!');
//       setProduct({
//         name: '',
//         price: '',
//         image: '',
//         category: '',
//         description: '',
//         rating: 0,
//         ratingCount: 0,
//         reviewCount: 0,
//         sizes: []
//       });
//       setImageFile(null);
//     } catch (error) {
//       console.error('Error adding product:', error);
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
//       <div className="form-container">
//         <h2>Add Product</h2>
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
//           <p>Sizes:</p>
//           <div className="sizes-container">
//             {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
//               <label key={size} className="size-label">
//                 <input
//                   type="checkbox"
//                   checked={product.sizes.includes(size)}
//                   onChange={() => handleSizeChange(size)}
//                 />
//                 {size}
//               </label>
//             ))}
//           </div>
//         </div>
//         <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
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
//                   <div style={{ whiteSpace: 'pre-wrap' }}>{product.description}</div>
//                   <p>Rating: {product.rating} ★ ({product.ratingCount} ratings, {product.reviewCount} reviews)</p>
//                   <p>Sizes: {product.sizes.join(', ')}</p>
//                 </div>
//               </div>
//               <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Admin;


import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './Firebase';
import './Admin.css';

function Admin() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    rating: 0,
    ratingCount: '',
    reviewCount: '',
    sizes: [],
    productCode: ''
  });
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => { 
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          sizes: data.sizes || []
        };
      });
      setProducts(productsList);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSizeChange = (size) => {
    const updatedSizes = product.sizes.includes(size)
      ? product.sizes.filter(s => s !== size)
      : [...product.sizes, size];
    setProduct({ ...product, sizes: updatedSizes });
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

  const handleAddProduct = async () => {
    try {
      let imageUrl = '';
      if (imageFile) {
        const imageRef = ref(storage, `product-images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const productCode = await generateProductCode();

      await addDoc(collection(db, 'products'), {
        ...product,
        image: imageUrl,
        price: parseFloat(product.price),
        rating: parseFloat(product.rating),
        ratingCount: parseInt(product.ratingCount),
        reviewCount: parseInt(product.reviewCount),
        productCode: productCode
      });
      alert('Product added successfully!');
      setProduct({
        name: '',
        price: '',
        image: '',
        category: '',
        description: '',
        rating: 0,
        ratingCount: 0,
        reviewCount: 0,
        sizes: [],
        productCode: ''
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
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
      <div className="form-container">
        <h2>Add Product</h2>
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
          <select name="category" value={product.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="western">Western</option>
            <option value="traditional">Traditional</option>
            <option value="new-arrivals">New Arrivals</option>
            <option value="sale">Sale</option>
          </select>
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
          <p>Sizes:</p>
          <div className="sizes-container">
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <label key={size} className="size-label">
                <input
                  type="checkbox"
                  checked={product.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
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
                  <p>Category: {product.category}</p>
                  <p>Product Code: {product.productCode}</p>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{product.description}</div>
                  <p>Rating: {product.rating} ★ ({product.ratingCount} ratings, {product.reviewCount} reviews)</p>
                  <p>Sizes: {product.sizes.join(', ')}</p>
                </div>
              </div>
              <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
// components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { handledAPIPost, handledAPIPut } from '../apis/auth.js';

const ProductForm = ({ existingProduct, isEdit }) => {
  const [formData, setFormData] = useState({
    name: existingProduct?.name || '',
    sku: existingProduct?.sku || '',
    price: existingProduct?.price || '',
    images: existingProduct?.images.join(', ') || '', // Assuming images is an array
    description: existingProduct?.description || '',
    category: existingProduct?.category || 'Apartment',
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        sku: existingProduct.sku,
        price: existingProduct.price,
        images: existingProduct.images.join(', '), // Convert array back to string for input
        description: existingProduct.description,
        category: existingProduct.category,
      });
    }
  }, [existingProduct]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert images string to array
    const productData = {
      ...formData,
      images: formData.images.split(',').map((img) => img.trim()),
    };

    if (isEdit) {
      // Call update API instead
      await handledAPIPut(`/products/${formData.sku}`, productData); // Update product by SKU
    } else {
      await handledAPIPost("/products", productData); // Create new product
    }

    // Clear form after submission
    setFormData({
      name: '',
      sku: '',
      price: '',
      images: '',
      description: '',
      category: 'Apartment',
    });

    if (isEdit) {
      alert('Property updated successfully!');
    } else {
      alert('Property Added successfully!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vw-100 m-5">
      <div className="w-50 p-4 border rounded shadow-sm">
        <h2 className='text-danger'>{isEdit ? 'Edit Product' : 'Create New Property'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="formName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formName"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* SKU Field */}
          <div className="mb-3">
            <label htmlFor="formSKU" className="form-label">
              SKU
            </label>
            <input
              type="text"
              className="form-control"
              id="formSKU"
              name="sku"
              placeholder="Enter product SKU"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price Field */}
          <div className="mb-3">
            <label htmlFor="formPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="formPrice"
              name="price"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Images Field */}
          <div className="mb-3">
            <label htmlFor="formImages" className="form-label">
              Images (URLs separated by commas)
            </label>
            <input
              type="text"
              className="form-control"
              id="formImages"
              name="images"
              placeholder="Enter product image URLs"
              value={formData.images}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label htmlFor="formDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="formDescription"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
            ></textarea>
          </div>

          {/* Category Field */}
          <div className="mb-3">
            <label htmlFor="formCategory" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="formCategory"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Cottage">Cottage</option>
              <option value="House">House</option>
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Update Property' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

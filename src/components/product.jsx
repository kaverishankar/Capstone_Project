import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { handledAPIPost } from '../apis/auth.js';

const DEFAULT_IMAGE_URL = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

const Product = ({ name, sku, images, price, description, category, sellerInfo }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'cart_add',
      product: { name, sku, images, price, description, category, sellerInfo, qty: quantity }, 
    });
  };

  const handleInterestClick = async () => {
    try {
      const payload = {
        sellerInfo: { name: sellerInfo.name, email: sellerInfo.email },
        productInfo: { name: name, price: price, description: description },
      };
  
      await handledAPIPost('/mail/send-interest-email', payload);
      alert('Interest email has been sent to the seller!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };
  

  return (
    <div className="card m-2 d-inline-block zoom-in-animation" style={{ maxWidth: '1000px', margin: '20px auto' }}>
      <div className='row'>
        <div className="col">
          <div id={`carousel-${sku}`} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {(images && images.length > 0 ? images : [DEFAULT_IMAGE_URL]).map((image, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img
                    src={image}
                    className="d-block w-100"
                    style={{ height: 400, objectFit: 'cover' }} 
                    alt={`${name} - ${index + 1}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = DEFAULT_IMAGE_URL; 
                    }}
                  />
                </div>
              ))}
            </div>
           
            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${sku}`} data-bs-slide="prev" aria-label="Previous slide">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span> {/* For screen readers */}
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${sku}`} data-bs-slide="next" aria-label="Next slide">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span> {/* For screen readers */}
            </button>
          </div>
        </div>

        <div className='col'>
          <div className="card-body">
            <h4 className="card-title">{name}</h4>
            <p className="card-text">
              <strong>Product SKU:</strong> {sku}
            </p>
            <p className="card-text">
              <strong>Price:</strong> ${(price || 0).toFixed(2)}
            </p>
            <p className="card-text">
              <strong>Description:</strong> {description}
            </p>
            <p className="card-text">
              Category: <span className="badge badge-secondary text-bg-secondary">{category}</span>
            </p>
            <h5>Seller Information</h5>
            <p>{sellerInfo?.name || "Unknown Seller"}</p>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </div>
            <p>Click if you are interested(send mail) 
            <button className="btn btn-outline-light bg-danger" onClick={handleInterestClick}>
            <i className="fa-solid fa-heart"></i>
            </button></p>

            <button className="btn btn-outline-light bg-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string,
  sku: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string), // Remove isRequired to handle missing images gracefully
  price: PropTypes.number,
  description: PropTypes.string,
  category: PropTypes.oneOf(['Apartment', 'Villa', 'Cottage', 'House']),
  sellerInfo: PropTypes.shape({
    name: PropTypes.string,
    userId: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string
  }), // Removed isRequired since you're checking with optional chaining
};


export default Product;

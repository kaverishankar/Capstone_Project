import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';


const CartItem = ({ index, name, sku, images, price, description, category }) => {

  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch({ type: "cart_remove", index });
  }

  return (
    <div className="card mb-3 mt-3">
      <div className="row">
        <div className="col-5">
          <img
            src={images[0]}
            style={{ height: 300, width: 500, objectFit: "contain" }}
            className="img-fluid rounded-start"
            alt={name}
          />
        </div>
        <div className="col-5">
          <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-text"><strong>SKU:</strong> {sku}</p>
            <p className="card-text"><strong>Price:</strong> ${price.toLocaleString()}</p>
            <p className="card-text"><strong>Description:</strong> {description}</p>
            <p className="card-text"><strong>Category:</strong> {category}</p>
          </div>
          <div className='d-flex justify-content-end'>
            <button onClick={removeFromCart} className='btn btn-danger'><i className="fa-solid fa-trash"></i> REMOVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['Apartment', 'Villa', 'Cottage', 'House']).isRequired,
};

export default CartItem;

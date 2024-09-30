import React from 'react';
import Loader from '../components/Loader.jsx';
import { useState } from 'react';
import { handledAPIPost } from '../apis/auth.js';
import CartItem from '../components/cartItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import instance from "../store/api-instance.js";

const Cart = () => {

  const cart = useSelector((state) => state.cart);

  const [payment, setPayment] = useState("cod");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const response = await handledAPIPost("/order/place-order", cart);

      alert(response.msg);

      navigate(`/orderSuccess?orderNo=${response.orderNo}`);

      dispatch({ type: "cart_clear" });
    } catch (err) {
      console.log(err);
      alert("Something went wrong, Please try again later");
    }
    finally {
      setLoading(false);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe('pk_test_51Q4Hx6G6vFpQQ4asAPNKm2uZXwFjoa2PX4omKhoxBSoo06uJrqCiDsgxbapLM6LPVFSWLEuGBXg4mn63LRTiJ3iu00b2JVho3X');

    const response = await instance.post("/payment/get-payment-session", {
      products: cart.products,
      
    });
 
    const { id } = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container m-5 vw-100">
      <h2 className='text-danger'>Your Shopping Cart</h2>
      {cart.products.length === 0 ? (
        <p className='text-danger'>Your cart is empty.</p>
      ) : (
        (cart.products || []).map(( product, index) => (
          <CartItem
            key={index}
            index={index}
            name={product.name}
            sku={product.sku}
            images={product.images}
            price={product.price}
            description={product.description}
            category={product.category}
            sellerInfo={product.sellerInfo}
          />
        )))}
        {cart.products.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
            className="mb-4"
          >
            <h4>
              Total Price: $
              {cart.products.reduce((p, c) => p + c.price, 0)}
            </h4>
            <div>
              <input
                type="radio"
                name="payment"
                value="cod"
                id="cod"
                checked={payment === "cod"}
                onChange={handlePaymentChange}
              />
              &nbsp;
              <label htmlFor="cod">Cash On Delivery</label>&nbsp;&nbsp;
              <input
                type="radio"
                name="payment"
                value="online"
                id="online"
                checked={payment === "online"}
                onChange={handlePaymentChange}
              />
              &nbsp;
              <label htmlFor="online">Online Payment</label>
            </div>
            <button
              onClick={() => {
                if (payment === "online") {
                  makePayment();
                } else {
                  placeOrder();
                }
              }}
              className="btn btn-primary"
            >
              Place Order
            </button>
          </div>
        )}
        </div>
  );
};


export default Cart;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/Product.jsx';
import { handledAPIGet } from "../apis/auth.js";
import Loader from "../components/Loader.jsx";

const ProductInfo = () => {
  const { productSku } = useParams();

  const [loading, setLoading] = useState(false);

  const [currentProduct, setProduct] = useState({});

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await handledAPIGet(`/products/available/${productSku}`);
      setProduct(product);
      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container m-4">
      <h1 className='text-danger'>Property Info</h1>
      <p>SKU: {productSku}</p>
      <Product {...currentProduct} />
    </div>
  );
};

export default ProductInfo;

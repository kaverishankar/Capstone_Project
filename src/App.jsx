import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import Loader from './components/Loader.jsx';
import Layout from './pages/Layout.jsx';
import store from './store/store.js';

const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Registeration.jsx'));
const ProductList = lazy(() => import('./pages/productListing.jsx'));
const ProInfo = lazy(() => import('./pages/productInfo.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const OrderSuccess = lazy(() => import('./pages/OrderSucess.jsx'));
const EditProduct = lazy(() => import('./pages/EditProduct.jsx'));

import './App.css';

const ProtectedComponent = ({ Component }) => {
  const { authenticated } = useSelector((state) => state.account);

  if (authenticated) {
    return Component; 
  }

  return <Navigate to="/login" />;
};

ProtectedComponent.propTypes = {
  Component: PropTypes.node.isRequired,
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ProtectedComponent Component={<ProductList />} />} />
              <Route path="/product/:productSku" element={<ProtectedComponent Component={<ProInfo />} />} />
              <Route path="/edit-product/:productSku" element={<ProtectedComponent Component={<EditProduct />} />} />
              <Route path="/cart" element={<ProtectedComponent Component={<Cart />} />} />
              <Route path="/orderSuccess" element={<ProtectedComponent Component={<OrderSuccess />} />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

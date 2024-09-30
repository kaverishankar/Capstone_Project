import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { handledAPIGet, handledAPIDelete } from '../apis/auth.js';
import ProductForm from '../components/prodForm.jsx'; 

const ProductDis = ({ name, price, images, sku, userInfo, onDelete }) => {

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            try {
                await handledAPIDelete(`/products/${sku}`);
                alert('Property deleted successfully');
                onDelete(sku); 
            } catch (error) {
                console.error('Failed to delete product:', error);
                alert('Error deleting product');
            }
        }
    };

    return (

        <div className="card m-3 d-inline-block">
            <img src={images[0]} className="card-img-top" alt={name}
                style={{ height: 200, width: 350, objectFit: 'cover' }}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://icrier.org/wp-content/uploads/2022/09/Event-Image-Not-Found.jpg";
                }} />
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="card-text">Price: ${price.toLocaleString()}</p>
                {userInfo.userType === 'seller' && (
                    <div className='d-flex justify-content-end'>
                        <Link to={`/edit-product/${sku}`}>
                            <button className='btn btn-warning justify-content-end m-2'>Edit</button>
                        </Link>
                        <button className='btn btn-danger m-2' onClick={handleDelete}><i className="fa-solid fa-trash" /></button>
                    </div>
                )}
            </div>
        </div>
    );
};

ProductDis.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    sku: PropTypes.string.isRequired,
    userInfo: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

const ProductList = () => {
    const { userInfo = { userType: "buyer", userId: "" } } = useSelector((state) => state.account || {});
    const [openForm, setFormState] = useState(false);
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const products = await handledAPIGet(
                userInfo.userType === "seller"
                    ? `/products/seller/${userInfo.userId}`
                    : "/products/available"
            );
            setProducts(products);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleProductDelete = (sku) => {
        setProducts(products.filter((product) => product.sku !== sku));
    };

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setFormState(false); // Close the form after adding product
        alert('Product added successfully!'); // Feedback to user
    };

    return (
        <div className="container m-5">
            {userInfo.userType === 'buyer' &&
                <h1 className='text-danger'>Properties Available</h1>}
            {userInfo.userType === 'seller' &&
                <button onClick={() => setFormState(true)} className="btn btn-primary">
                    Add New Property
                </button>}
            {openForm && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        placeItems: "center",
                        placeContent: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        className="bg-white p-4"
                        style={{ minWidth: 500, height: 600, overflowY: "scroll" }}
                    >
                        <div
                            style={{
                                maxWidth: '50%',
                                position: 'relative',
                                float: 'right'
                            }}
                        >
                            <button className="btn btn-danger p-3" onClick={() => setFormState(false)}>X</button>
                        </div>
                        <ProductForm onSubmit={handleProductAdded} /> 
                    </div>
                </div>
            )}
            <div className='container m-2 pl-5'>
                {products.map((product) => (
                    userInfo.userType === 'seller' ? (
                        <ProductDis key={product.sku} {...product} userInfo={userInfo} onDelete={handleProductDelete} /> 
                    ) : (
                        <Link key={product.sku} to={`/product/${product.sku}`}>
                            <ProductDis {...product} userInfo={userInfo} onDelete={() => { }} />
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
};

export default ProductList;

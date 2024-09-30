import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handledAPIGet, handledAPIPut } from '../apis/auth.js';

const EditProduct = () => {
    const { productSku } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        images: [''],
        description: '',
        category: '',
        sellerInfo: {
            name: '',
            email: '',
            address: '',
        },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await handledAPIGet(`/products/${productSku}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productSku]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handledAPIPut(`/products/${productSku}`, product);
            navigate('/'); 
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('sellerInfo.')) {
            const sellerField = name.split('.')[1];
            setProduct((prevProduct) => ({
                ...prevProduct,
                sellerInfo: { ...prevProduct.sellerInfo, [sellerField]: value },
            }));
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='container m-5'>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={product.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        className='form-control'
                        id='price'
                        name='price'
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        className='form-control'
                        id='description'
                        name='description'
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='category'>Category:</label>
                    <select
                        className='form-control'
                        id='category'
                        name='category'
                        value={product.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value=''>Select Category</option>
                        <option value='Apartment'>Apartment</option>
                        <option value='Villa'>Villa</option>
                        <option value='Cottage'>Cottage</option>
                        <option value='House'>House</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='images'>Image URLs:</label>
                    <input
                        type='url'
                        className='form-control'
                        id='images'
                        name='images'
                        value={product.images[0]}
                        onChange={(e) => setProduct({ ...product, images: [e.target.value] })}
                        required
                    />
                </div>
                <div className='form-group'>
                    <h5>Seller Information</h5>
                    <label htmlFor='sellerInfo.name'>Seller Name:</label>
                    <input
                        type='text'
                        className='form-control'
                        id='sellerInfo.name'
                        name='sellerInfo.name'
                        value={product.sellerInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor='sellerInfo.email'>Seller Email:</label>
                    <input
                        type='email'
                        className='form-control'
                        id='sellerInfo.email'
                        name='sellerInfo.email'
                        value={product.sellerInfo.email}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor='sellerInfo.address'>Seller Address:</label>
                    <input
                        type='text'
                        className='form-control'
                        id='sellerInfo.address'
                        name='sellerInfo.address'
                        value={product.sellerInfo.address}
                        onChange={handleInputChange}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Update Property
                </button>
            </form>
        </div>
    );
};

export default EditProduct;

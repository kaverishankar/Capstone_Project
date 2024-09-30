import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handledAPIGet } from '../apis/auth.js';
import ProductForm from '../components/prodForm.jsx';

const EditProduct = () => {
    const { productSku } = useParams();
    const [existingProduct, setExistingProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await handledAPIGet(`/products/${productSku}`);
                setExistingProduct(product);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        fetchProduct();
    }, [productSku]);

    return (
        <div>
            {existingProduct ? (
                <ProductForm existingProduct={existingProduct} isEdit={true} />
            ) : (
                <p>Loading product data...</p>
            )}
        </div>
    );
};

export default EditProduct;

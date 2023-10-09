import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard'; 
import arrow from '../../images/arrow.svg';
import ProductDetailModal from '../../modal_windows/product_modals/ProductDetailModal';  

function Favorites({ handleBack }) {
    const [likedProducts, setLikedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const productsData = JSON.parse(localStorage.getItem('liked_products') || '[]');
        setLikedProducts(productsData);
    }, []);

    function showProductDetails(productId) {
        setSelectedProduct(productId);
    }

    function handleUnlike(productId) {
        const updatedProducts = likedProducts.filter(p => p.id !== productId);
        setLikedProducts(updatedProducts);
        
        localStorage.setItem('liked_products', JSON.stringify(updatedProducts));
    }

    return (
        <div className='content'>
            <div className='content-header'>
                <button onClick={handleBack} className='profile-back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </button>
                <span className='content-title'>Понравившиеся</span>
            </div>
            <div className='user-items-content-section'>
                {likedProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        handleProductClick={showProductDetails}  
                        onUnlike={(productId) => handleUnlike(productId)} 
                    />
                ))}
            </div>
            {selectedProduct && 
                <ProductDetailModal 
                    productId={selectedProduct} 
                    onClose={() => setSelectedProduct(null)}
                />}
        </div>
    );
}

export default Favorites;

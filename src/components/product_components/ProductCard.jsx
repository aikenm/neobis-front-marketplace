import React, { useState } from 'react';
import likeIcon from '../../images/like-icon.svg';
import notLikedIcon from '../../images/not-liked-icon.svg';
import testImage from '../../images/product_image_samples/image 2test.png';

function ProductCard({ product, handleProductClick }) {
    const [isLiked, setIsLiked] = useState(false); 

    const toggleLike = (event) => {
        event.stopPropagation();  // Stop event propagation
        setIsLiked(!isLiked);
        // You can also update the likes on the server here.
    };

        return (
        <div onClick={handleProductClick} className='product-card'>
            <img src={product.photo || testImage} alt='' className='product-card-image' />
            <span className='product-card-name'>{product.name || "Default Name"}</span>
            <span className='product-card-price'>$ {parseInt(product.price, 10) || "Default Price"}</span>
            <div className='product-card-like-wrapper'>
                <button className='product-card-like-button' onClick={toggleLike}>
                    <img src={isLiked ? likeIcon : notLikedIcon} alt='' className='product-card-like-icon' />
                </button>
                <span className='product-card-likes'>{product.likes || 0}</span>
            </div>
        </div>
    );
}

export default ProductCard;

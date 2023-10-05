import React from 'react';
import likeIcon from '../../images/like-icon.svg';
import testImage from '../../images/image 2test.png';

function ProductCard({ product, handleProductClick }) {
    return (
      <div onClick={handleProductClick} className='product-card'>
          <img src={product.photo || testImage} alt='' className='product-card-image' />
          <span className='product-card-name'>{product.name || "Default Name"}</span>
          <span className='product-card-price'>$ {product.price || "Default Price"}</span>
          <div className='product-card-like-wrapper'>
              <button className='product-card-like-button'>
                <img src={likeIcon} alt='' className='product-card-like-icon' />
              </button>
              <span className='product-card-likes'>{product.likes || 0}</span>
          </div>
      </div>
    );
  }
  

export default ProductCard;

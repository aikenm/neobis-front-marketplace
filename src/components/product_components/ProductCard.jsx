import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeProduct, unlikeProduct } from '../../store/productSlice';  
import likeIcon from '../../images/like-icon.svg';
import notLikedIcon from '../../images/not-liked-icon.svg';
import testImage from '../../images/product_image_samples/image 2test.png';
import moreIcon from '../../images/drop-down.svg';
import editIcon from '../../images/edit-icon.svg';
import deleteIcon from '../../images/delete-small-icon.svg';

function ProductCard({ product, handleProductClick, showMoreButton }) {
  const [isLiked, setIsLiked] = useState(false); 
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const dispatch = useDispatch();
  const likesCount = useSelector((state) => state.product.likesCount);
  const createProductStatus = useSelector((state) => state.product.createProductStatus);

  const toggleLike = async (event) => {
    event.stopPropagation();  
    setIsLiked(!isLiked);

    if (!isLiked) {
      try {
        await dispatch(likeProduct(product.id));
        console.log('Successfully liked product');
      } catch (error) {
        console.error('Failed to like product', error);
      }
    } else {
      try {
        await dispatch(unlikeProduct(product.id));
        console.log('Successfully unliked product');
      } catch (error) {
        console.error('Failed to unlike product', error);
      }
    }

    if (createProductStatus === 'fulfilled') {
      setIsLiked(likesCount > 0);
    }
  };

  const handleMoreClick = (event) => {
    event.stopPropagation();  
    setShowExtraButtons(!showExtraButtons);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
  };
  
  const handleDeleteClick = (event) => {
    event.stopPropagation();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowExtraButtons(false);
    }, 200);
  };

  return (
    <div onClick={() => handleProductClick(product.id)} className='product-card'>
      <img src={product.photo || testImage} alt='' className='product-card-image' />
      <span className='product-card-name'>{product.name || "Default Name"}</span>
      <span className='product-card-price'>$ {parseInt(product.price, 10) || "Default Price"}</span>
      <div className='product-card-like-wrapper'>
        <button className='product-card-like-button' onClick={toggleLike}>
          <img src={isLiked ? likeIcon : notLikedIcon} alt='' className='product-card-like-icon' />
        </button>
        <span className='product-card-likes'>{likesCount || 0}</span>
        {showMoreButton && (
          <div onBlur={handleBlur} className='product-card-more-wrapper'>
            <button className='product-card-more-button' onClick={handleMoreClick}>
                <img src={moreIcon} alt='' className='product-card-more-button' />
            </button>
            {showExtraButtons && (
              <div className="extra-buttons">
                <button className='product-card-edit-button' onClick={handleEditClick}>
                    <img src={editIcon} alt='' className='more-icons' />Изменить
                </button>
                <button className='product-card-delete-button' onClick={handleDeleteClick}>
                    <img src={deleteIcon} alt='' className='more-icons' />Удалить
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

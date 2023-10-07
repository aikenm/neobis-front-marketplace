import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeProduct, unlikeProduct, deleteProduct } from '../../store/productSlice';  
import likeIcon from '../../images/like-icon.svg';
import notLikedIcon from '../../images/not-liked-icon.svg';
import testImage from '../../images/product_image_samples/image 2test.png';
import moreIcon from '../../images/drop-down.svg';
import editIcon from '../../images/edit-icon.svg';
import deleteIcon from '../../images/delete-small-icon.svg';
import ProductDeleteModal from './ProductDeleteModal';
import ProductEditModal from './ProductEditModal';

function ProductCard({ product, handleProductClick, showMoreButton, onUpdate }) {
  const dispatch = useDispatch();

  const isLiked = useSelector((state) => state.product.likedProducts[product.id] || false);
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [localLikesCount, setLocalLikesCount] = useState(product.likesCount || 0);

  const toggleLike = async (event) => {
    event.stopPropagation();

    if (isLiked) {
        try {
            await dispatch(unlikeProduct(product.id));
            console.log('Successfully unliked product');
            setIsLiked(false);
            setLocalLikesCount(localLikesCount - 1);
        } catch (error) {
            console.error('Failed to unlike product', error);
        }
    } else {
        try {
            const response = await dispatch(likeProduct(product.id));
            
            if (response.payload && response.payload.message !== "Product already liked") {
                console.log('Successfully liked product');
                setIsLiked(true);
                setLocalLikesCount(localLikesCount + 1);
            } else {
                console.warn(response.payload.message);
            }
        } catch (error) {
            console.error('Failed to like product', error);
        }
    }
};







  const handleMoreClick = (event) => {
    event.stopPropagation();  
    setShowExtraButtons(!showExtraButtons);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    setShowEditModal(true);
  };
  
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = (event) => {
    if (event) event.stopPropagation();
    setShowDeleteModal(false); 
  
    dispatch(deleteProduct(product.id))
      .then((response) => {
        console.log('Product successfully deleted', response);
      })
      .catch((error) => {
        console.error('Failed to delete product', error);
      });
  };

  const handleDeleteCancel = (event) => {
    if (event) event.stopPropagation();
  setShowDeleteModal(false); 
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowExtraButtons(false);
    }, 200);
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate();
    }
    setShowEditModal(false);
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
        <span className='product-card-likes'>{localLikesCount || 0}</span>
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
      <ProductDeleteModal 
        show={showDeleteModal} 
        onConfirm={handleDeleteConfirm} 
        onCancel={handleDeleteCancel} 
      />
      {showEditModal && <ProductEditModal productId={product.id} onClose={handleUpdate} />}

    </div>
  );
}

export default ProductCard;

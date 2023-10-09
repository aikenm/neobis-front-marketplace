import React, { useState, useEffect } from 'react';  
import { useDispatch } from 'react-redux';
import { likeProduct, unlikeProduct, deleteProduct } from '../store/productSlice';  
import likeIcon from '../images/like-icon.svg';
import notLikedIcon from '../images/not-liked-icon.svg';
import moreIcon from '../images/drop-down.svg';
import editIcon from '../images/edit-icon.svg';
import deleteIcon from '../images/delete-small-icon.svg';
import ProductDeleteModal from '../modal_windows/product_modals/ProductDeleteModal';
import ProductEditModal from '../modal_windows/product_modals/ProductEditModal';

function ProductCard({ product, handleProductClick, showMoreButton, onUpdate, onProductDeleted, activeProduct, setActiveProduct, showLikeCount = false, onUnlike }) {
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(() => {
    const likedInStorage = localStorage.getItem(`product_liked_${product.id}`);
    return likedInStorage === 'true'; 
  });

  const showExtraButtons = product.id === activeProduct;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [localLikesCount, setLocalLikesCount] = useState(product.like_count || 0);

  const toggleLike = async (event) => {
    event.stopPropagation();

    const likedProducts = JSON.parse(localStorage.getItem('liked_products') || '[]');

    if (isLiked) {
        try {
            const unlikedResponse = await dispatch(unlikeProduct(product.id));
            
            if (unlikedResponse && unlikedResponse.payload) {
                console.log('Successfully unliked product');
                setIsLiked(false);
                localStorage.setItem(`product_liked_${product.id}`, 'false'); 
                setLocalLikesCount(localLikesCount - 1);

                const updatedProducts = likedProducts.filter(p => p.id !== product.id);
                localStorage.setItem('liked_products', JSON.stringify(updatedProducts));

            } else {
                console.warn("Unexpected response structure or missing payload for unliking.");
            }
        } catch (error) {
            console.error('Failed to unlike product', error);
        }
        if (onUnlike) onUnlike(product.id);
    } else {
        try {
            const likedResponse = await dispatch(likeProduct(product.id));
            
            if (likedResponse && likedResponse.payload) {
                console.log('Successfully liked product');
                setIsLiked(true);
                localStorage.setItem(`product_liked_${product.id}`, 'true');
                setLocalLikesCount(localLikesCount + 1);

                likedProducts.push(product);
                localStorage.setItem('liked_products', JSON.stringify(likedProducts));

            } else {
                console.warn("Unexpected response structure or missing payload for liking.");
            }
        } catch (error) {
            console.error('Failed to like product', error);
        }
    }
};


  const handleMoreClick = (event) => {
    event.stopPropagation();
    if (product.id === activeProduct) {
      setActiveProduct(null);
    } else {
      setActiveProduct(null);
      setTimeout(() => {
        setActiveProduct(product.id);
      }, 0);
    }
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
    setActiveProduct(null);
    setShowDeleteModal(false); 
  
    dispatch(deleteProduct(product.id))
      .then((response) => {
        console.log('Product successfully deleted', response);
        if (onProductDeleted) {
          onProductDeleted(product.id); 
        }
      })
      .catch((error) => {
        console.error('Failed to delete product', error);
      });
  };

  const handleDeleteCancel = (event) => {
    if (event) event.stopPropagation();
  setShowDeleteModal(false); 
  };

  const handleUpdate = (updatedProduct) => {
    setActiveProduct(null); 
    if (onUpdate) {
      onUpdate(updatedProduct);
    }
    setShowEditModal(false);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
        setActiveProduct(null);
    }
};


  useEffect(() => {
    const likedInStorage = localStorage.getItem(`product_liked_${product.id}`);
    setIsLiked(likedInStorage === 'true');
  }, [product.id]);
  
  return (
    <div onClick={() => handleProductClick(product.id)} className='product-card'>
      <img src={product.photo} alt='' className='product-card-image' />
      <span className='product-card-name'>{product.name || "Название"}</span>
      <span className='product-card-price'>$ {parseInt(product.price, 10) || "0"}</span>
      <div className='product-card-like-wrapper'>
        <button className='product-card-like-button' onClick={toggleLike}>
          <img src={isLiked ? likeIcon : notLikedIcon} alt='' className='product-card-like-icon' />
        </button>
        { showLikeCount && <span className='product-card-likes'>{localLikesCount || 0}</span> }
        {showMoreButton && (
          <div 
              className='product-card-more-wrapper' 
              tabIndex="0"
              onBlur={handleBlur}
          >
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
      {showEditModal && <ProductEditModal productId={product.id} onClose={(updatedProduct) => handleUpdate(updatedProduct)} />}
    </div>
  );
}

export default ProductCard;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetail, fetchLikesCount, clearProduct } from '../../store/productSlice';
import testImage from '../../images/product_image_samples/image 2test.png';
import likeIcon from '../../images/like-icon.svg';

const ItemDetailModal = ({ onClose, productId }) => {
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(true); 
    const product = useSelector((state) => state.product);
    const likesCount = product.likesCount; // From Redux state
  
    useEffect(() => {
      if (productId) {
        setIsLoading(true); 
        dispatch(fetchProductDetail(productId));
        dispatch(fetchLikesCount(productId)).finally(() => {
          setIsLoading(false); 
        });
      }
    }, [productId, dispatch]);
  
    const handleClose = () => {
      onClose();
      dispatch(clearProduct());
    };
  
    if (isLoading) {
      return <div></div>;
    }

  return (
    <div className="modal-overlay">
        <div className="modal-product-detail-content">
            <div className='carousel-container'>
                <img src={product.photo || testImage} alt='' className='product-detail-image' />
            </div>
            <div className='product-detail-container'>
                <span className='product-detail-price'>$ {parseInt(product.price, 10) || 'Default Price'}</span>
                <span className='product-detail-likes'><img src={likeIcon} alt='' className='product-detail-like-icon' />Нравится: {likesCount || 0}</span>
                <span className='product-detail-name'>{product.name || 'Default Name'}</span>
                <p className='product-detail-description'>{product.shortDescription || 'Default Short Description'}</p>
                <span className='product-detail-description-title'>Детальное описание</span>
                <p className='product-detail-description'>{product.fullDescription || 'Default Full Description'}</p>
                <button onClick={handleClose} className='product-detail-close-button'>✖</button>
            </div>
        </div>
    </div>
  );
};

export default ItemDetailModal;

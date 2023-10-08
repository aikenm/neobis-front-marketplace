import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetail, clearProduct } from '../../store/productSlice';
import testImage from '../../images/product_image_samples/image 2test.png';
import likeIcon from '../../images/like-icon.svg';

const ProductDetailModal = ({ onClose, productId }) => {
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(true); 
    const product = useSelector((state) => state.product);
  
    useEffect(() => {
      if (productId) {
        setIsLoading(true); 
        dispatch(fetchProductDetail(productId)).finally(() => {
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
        <div className="modal-product-content">
            <div className='carousel-container'>
                <img src={product.photo || testImage} alt='' className='product-image' />
            </div>
            <div className='product-container'>
                <span className='product-price'>$ {parseInt(product.price, 10) || 'Default Price'}</span>
                <span className='product-likes'><img src={likeIcon} alt='' className='product-like-icon' />Нравится: {product.like_count || 0}</span>
                <span className='product-name'>{product.name || 'Default Name'}</span>
                <p className='product-description'>{product.shortDescription || 'Default Short Description'}</p>
                <span className='product-description-title'>Детальное описание</span>
                <p className='product-description'>{product.fullDescription || 'Default Full Description'}</p>
                <button onClick={handleClose} className='product-detail-close-button'>✖</button>
            </div>
        </div>
    </div>
  );
};

export default ProductDetailModal;

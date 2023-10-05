import React from 'react';
import testImage from '../../images/product_image_samples/image 2test.png'
import likeIcon from '../../images/like-icon.svg'

const ItemAddModal = ({ onClose }) => {

    const handleClose = () => {
        onClose();
      };
    
  return (
    <div className="modal-overlay">
        <div className="modal-product-detail-content">
            <div className='carousel-container'>
                <img src={testImage} alt='' className='product-detail-image' />
            </div>
            <div className='product-detail-container'>
                <span className='product-detail-price'>12000 com</span>
                <span className='product-detail-likes'><img src={likeIcon} alt='' className='product-detail-like-icon' />Нравится: 1 M</span>
                <span className='product-detail-name'>Adidas Yeezy 500</span>
                <p className='product-detail-description'>The Yeezy 500 Blush is a limited edition shoe designed by Kanye West for Adidas</p>
                <span className='product-detail-description-title'>Детальное описание</span>
                <p className='product-detail-description'>It features a unique design, with a chunky silhouette and a blush colorway. The shoe has a mix of suede, mesh and leather, and it's considered a highly sought-after item among shoe enthusiasts.</p>
                <button onClick={handleClose} className='product-detail-close-button'>✖</button>
            </div>
        </div>
    </div>
    );
};

export default ItemAddModal;

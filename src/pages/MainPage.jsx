import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemAddModal from '../components/main_components/ItemAddModal'; 
import ItemDetailModal from '../components/main_components/ItemDetailModal'; 
import defaultAvatar from '../images/avatar.svg';
import miniLogo from '../images/mini-logo.svg';
import testImage from '../images/image 2test.png'
import likeIcon from '../images/like-icon.svg'

function MainPage() {
  const [showaddModal, setShowaddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const user = useSelector((state) => state.user);
  const avatar = useSelector((state) => state.user.avatar);

  const handleProductClick = () => {
    setShowDetailModal(true);  
  };

  return (
    <div className='main-page'>
      <div className='header'>
        <div className='header-logo'>
          <img src={miniLogo} alt='logo' className='main-logo-icon' />
          <span className='header-logo-text'>MOBI MARKET</span>
        </div>
        <button 
          className='form-button add-item-button'
          onClick={() => setShowaddModal(true)}>
            Подать объявление
        </button>
        <Link to="/profile" className='main-profile-button'>
          <div className='profile-info'>
            <span className='user-login'>{user.username}</span>
            <span className='user-email'>{user.email}</span>
          </div>
          <img src={(avatar && avatar !== 'https://res.cloudinary.com/dpcjm5ifg/image/upload/v1/media/avatar_images/avatar.jpg') ? avatar : defaultAvatar} alt='avatar' className='avatar'/> 
        </Link>
      </div>
      <div className='items-section'>
        <div onClick={handleProductClick} className='temp-product-card'>
            <img src={testImage} alt='' className='product-card-image' />
            <span className='product-card-name'>Adidas Yeezy 500</span>
            <span className='product-card-price'>23 000 $</span>
            <div className='product-card-like-wrapper'>
                <button className='product-card-like-button'><img src={likeIcon} alt='' className='product-card-like-icon' /></button><span className='product-card-likes'>100</span>
            </div>
        </div>
      </div>

      {showaddModal && <ItemAddModal onClose={() => setShowaddModal(false)} />}
      {showDetailModal && <ItemDetailModal onClose={() => setShowDetailModal(false)} />}
    </div>
  );
}

export default MainPage;

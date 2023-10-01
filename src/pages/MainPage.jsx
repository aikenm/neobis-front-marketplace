import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemAddModal from '../components/main_components/ItemAddModal';  
import defaultAvatar from '../images/avatar.svg';
import miniLogo from '../images/mini-logo.svg';

function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const avatar = useSelector((state) => state.user.avatar);

  return (
    <div className='main-page'>
      <div className='header'>
        <div className='header-logo'>
          <img src={miniLogo} alt='logo' className='main-logo-icon' />
          <span className='header-logo-text'>MOBI MARKET</span>
        </div>
        <button 
          className='form-button add-item-button'
          onClick={() => setShowModal(true)}>
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
        <h1>sec</h1>
      </div>

      {showModal && <ItemAddModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default MainPage;

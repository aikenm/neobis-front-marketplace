import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemAddModal from '../components/main_components/ItemAddModal'; 
import ItemDetailModal from '../components/main_components/ItemDetailModal'; 
import defaultAvatar from '../images/avatar.svg';
import miniLogo from '../images/mini-logo.svg';
import ProductCard from '../components/product_components/ProductCard';

function MainPage() {
  const [showaddModal, setShowaddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const avatar = useSelector((state) => state.user.avatar);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://www.ishak-backender.org.kg/products/product-list/', {
        headers: {
          'accept': 'application/json',
        }
      });

      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('An error occurred while fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        {products.map((product, index) => (
          <ProductCard key={index} product={product} handleProductClick={handleProductClick} />
        ))}
      </div>

      {showaddModal && <ItemAddModal onClose={() => setShowaddModal(false)} />}
      {showDetailModal && <ItemDetailModal onClose={() => setShowDetailModal(false)} />}
    </div>
  );
}

export default MainPage;

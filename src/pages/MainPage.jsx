import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductAddModal from '../modal_windows/product_modals/ProductAddModal';
import ProductDetailModal from '../modal_windows/product_modals/ProductDetailModal';
import defaultAvatar from '../images/avatar.svg';
import miniLogo from '../images/mini-logo.svg';
import warning from '../images/warning.svg';
import ProductCard from '../components/ProductCard';
import { resetCreateProductStatus, clearProduct } from '../store/productSlice';

function MainPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);


  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const avatar = useSelector((state) => state.user.avatar);
  const createProductStatus = useSelector((state) => state.product.createProductStatus); 

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://www.ishak-backender.org.kg/products/product-list/', {
        headers: {
          'accept': 'application/json',
        }
      });
      const fetchedProducts = response.data;
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('An error occurred while fetching data: ', error);
    }
  };

  const handleProductCreationSuccess = () => {
    setShowTooltip(true);
  
    setTimeout(() => {
      const tooltipElem = document.querySelector('.product-created-tooltip');
      if (tooltipElem) {
        tooltipElem.classList.remove('show');
        setTimeout(() => {
          setShowTooltip(false);
        }, 300);
      }
    }, 4000);
  };
  

  useEffect(() => {
    dispatch(clearProduct());
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (createProductStatus === 'fulfilled') {
      fetchProducts();
      handleProductCreationSuccess();
    }
  }, [createProductStatus, dispatch]);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
    setShowDetailModal(true);
  };

  const handleCreateProductClick = () => {
    dispatch(resetCreateProductStatus());
    setShowAddModal(true);
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
            onClick={handleCreateProductClick}>
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
          <ProductCard 
            key={index} 
            product={product} 
            handleProductClick={handleProductClick}
            showLikeCount={true} 
          />
        ))}
      </div>

      {showTooltip && <div className="product-created-tooltip show"><img src={warning} alt='Warning sign' className='warning-icon'/>Товар добавлен</div>}
      {showAddModal && <ProductAddModal onClose={() => setShowAddModal(false)} />}
      {showDetailModal && <ProductDetailModal productId={selectedProductId} onClose={() => setShowDetailModal(false)} />}
    </div>
  );
}

export default MainPage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import arrow from '../../images/arrow.svg';
import ProductCard from '../product_components/ProductCard'; 
import ItemDetailModal from '../main_components/ItemDetailModal';  // Import the Detail Modal

function UserItems() {
  const [products, setProducts] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false); // New State
  const [selectedProductId, setSelectedProductId] = useState(null); // New State
  
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('access_token'); 
      const config = {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      try {
        const response = await axios.get('https://www.ishak-backender.org.kg/products/product/api/', config);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    setSelectedProductId(id);  // Set the selected Product ID
    setShowDetailModal(true);  // Open the Modal
  };

    return (
        <div className='content'>
            <div className='content-header'>
                <Link to="/main" className='profile-back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </Link>
                <span className='content-title'>Мои товары</span>
            </div>
            <div className='user-items-content-section'>
            {products.map((product, index) => (
                <ProductCard key={index} product={product} handleProductClick={() => handleProductClick(product.id)} />
            ))}
            </div>
            {showDetailModal && <ItemDetailModal productId={selectedProductId} onClose={() => setShowDetailModal(false)} />} {/* New Line */}
        </div>
    );
}

export default UserItems;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import arrow from '../../images/arrow.svg';
import ProductCard from '../../components/ProductCard'; 
import ProductetailModal from '../../modal_windows/product_modals/ProductDetailModal';  

function UserItems({ handleBack }) {
  const [products, setProducts] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false); 
  const [selectedProductId, setSelectedProductId] = useState(null); 
  
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    setSelectedProductId(id);  
    setShowDetailModal(true);  
  };

    return (
        <div className='content'>
            <div className='content-header'>
                <button onClick={handleBack} className='profile-back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </button>
                <span className='content-title'>Мои товары</span>
            </div>
            <div className='user-items-content-section'>
            {products.map((product, index) => (
                <ProductCard 
                    key={index} 
                    product={product} 
                    handleProductClick={() => handleProductClick(product.id)} 
                    showMoreButton={true}
                    onUpdate={fetchProducts} 
                />
            ))}
            </div>
            {showDetailModal && <ProductetailModal productId={selectedProductId} onClose={() => setShowDetailModal(false)} />} {/* New Line */}
        </div>
    );
}

export default UserItems;

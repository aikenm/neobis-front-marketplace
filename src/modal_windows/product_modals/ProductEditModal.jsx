import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { fetchProductDetail, clearProduct } from '../../store/productSlice';
import testImage from '../../images/product_image_samples/image 2test.png';

const ProductEditModal = ({ onClose, productId, onUpdate }) => {
  const { register, handleSubmit, formState: { isValid } } = useForm();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const product = useSelector((state) => state.product);

  const onSubmit = async (data) => {
    try {
    const token = localStorage.getItem('access_token'); 
      const response = await axios.put(
        `https://www.ishak-backender.org.kg/products/product/api/${productId}/`,
        {
          name: data.name,
          description: data.fullDescription,
          available: true,
          short_description: data.shortDescription,
          price: data.price
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`          
          }
        }
      );
      console.log('Successfully updated product:', response.data);
      if (onUpdate) {
        onUpdate();
      }
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
    dispatch(clearProduct());
  };  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProductDetail(productId));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
      setIsLoading(false);
    };

    if (productId) {
      fetchData();
    }
  }, [productId, dispatch]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="modal-overlay" onClick={stopPropagation}>
      <div className="modal-product-edit-content">
        <div className='carousel-container'>
          <img src={product.photo || testImage} alt='' className='product-edit-image' />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='product-container'>
            <input
              {...register('price', { required: true })}
              defaultValue={parseInt(product.price)}
              className='product-input'
              placeholder='Цена'
            />
            <input
              {...register('name', { required: true })}
              defaultValue={product.name}
              className='product-input'
              placeholder='Название'
            />
            <input
              {...register('shortDescription', { required: true })}
              defaultValue={product.shortDescription}
              className='product-input'
              placeholder='Краткое описание'
            />
            <input
              {...register('fullDescription', { required: true })}
              defaultValue={product.fullDescription}
              className='product-input'
              placeholder='Полное описание'
            />
            <button type="submit" disabled={!isValid} className='product-button edit-button'>Сохранить</button>
            <button onClick={handleClose} className='product-edit-close-button'>✖</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setProductField, setProductImages, clearProduct } from '../../store/productSlice';
import addItemIcon from '../../images/add-item.svg'

const ItemAddModal = ({ onClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const [isFormValid, setFormValid] = useState(false);
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

  const onSubmit = (data) => {
    console.log('Submitting:', data);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    dispatch(setProductImages(files));
  };

  const handleClose = () => {
    onClose();
    reset(); 
    dispatch(clearProduct()); 
  };

  useEffect(() => {
    const allFieldsFilled = product.price && product.name && product.shortDescription && product.fullDescription;
    setFormValid(allFieldsFilled);
  }, [product]);

  return (
    <div className="modal-overlay">
        <div className="modal-add-item-content">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="file-image-section">
                    <label className="image-block-label">
                        <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="hidden-input-label"
                        />
                        <img src={addItemIcon} alt="Default" className="file-image" />
                    </label>
                    <div className="selected-images-wrapper">
                        {product.images.map((image, index) => (
                            <img 
                            key={index} 
                            src={URL.createObjectURL(image)} 
                            alt={`Selected ${index}`} 
                            className="selected-image"
                            />
                        ))}
                    </div>
                </div>
            
                <input
                    {...register('price', { required: true })}
                    onChange={(e) => dispatch(setProductField({ field: 'price', value: e.target.value }))}
                    value={product.price}
                    className='add-product-input'
                    placeholder='Цена'
                />

                <input
                    {...register('name', { required: true })}
                    onChange={(e) => dispatch(setProductField({ field: 'name', value: e.target.value }))}
                    value={product.name}
                    className='add-product-input'
                    placeholder='Название'
                />
                
                <input
                    {...register('shortDescription', { required: true })}
                    onChange={(e) => dispatch(setProductField({ field: 'shortDescription', value: e.target.value }))}
                    value={product.shortDescription}
                    className='add-product-input'
                    placeholder='Краткое описание'
                />
                
                <input
                    {...register('fullDescription', { required: true })}
                    onChange={(e) => dispatch(setProductField({ field: 'fullDescription', value: e.target.value }))}
                    value={product.fullDescription}
                    className='add-product-input'
                    placeholder='Полное описание'
                />
                <button type="submit" disabled={!isFormValid} className='add-product-button'>Добавить</button>
                <button onClick={handleClose} className='add-product-close-button'>✖</button>
            </form>
        </div>
    </div>
    );
};

export default ItemAddModal;

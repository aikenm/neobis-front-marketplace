import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setProductField, setProductPhoto, clearProduct, createProduct, resetCreateProductStatus } from '../../store/productSlice';
import addItemIcon from '../../images/add-item.svg'

const ProductAddModal = ({ onClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const [isFormValid, setFormValid] = useState(false);
    const dispatch = useDispatch();

    const product = useSelector((state) => state.product);
    const createProductStatus = useSelector((state) => state.product.createProductStatus);

    const [localFiles, setLocalFiles] = useState([]);

    const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    const fileMetadata = files.map((file, index) => ({
        id: index,
        name: file.name,
        size: file.size,
    }));
    
    setLocalFiles(files);
    dispatch(setProductPhoto(fileMetadata));
    };

    const onSubmit = (data) => {
        const productWithFiles = {
        ...product,
        photo: localFiles,
        };
        dispatch(createProduct(productWithFiles));
    };

    const handleClose = useCallback(() => {
        onClose();
        reset(); 
        dispatch(clearProduct()); 
        dispatch(resetCreateProductStatus());  
    }, [onClose, reset, dispatch]);

    useEffect(() => {
        const allFieldsFilled = product.price && product.name && product.shortDescription && product.fullDescription;
        setFormValid(allFieldsFilled);
    }, [product]);

    useEffect(() => {
        if (createProductStatus === 'fulfilled') {
            handleClose();
        }
    }, [createProductStatus, handleClose]);

    return (
        <div className="modal-overlay">
            <div className="modal-add-product-content">
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
                        {localFiles.map((photo, index) => (
                            <img 
                                key={index} 
                                src={URL.createObjectURL(photo)} 
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
                        className='product-input'
                        placeholder='Цена'
                    />

                    <input
                        {...register('name', { required: true })}
                        onChange={(e) => dispatch(setProductField({ field: 'name', value: e.target.value }))}
                        value={product.name}
                        className='product-input'
                        placeholder='Название'
                    />
                    
                    <input
                        {...register('shortDescription', { required: true })}
                        onChange={(e) => dispatch(setProductField({ field: 'shortDescription', value: e.target.value }))}
                        value={product.shortDescription}
                        className='product-input'
                        placeholder='Краткое описание'
                    />
                    
                    <textarea
                        {...register('fullDescription', { required: true })}
                        onChange={(e) => dispatch(setProductField({ field: 'fullDescription', value: e.target.value }))}
                        value={product.fullDescription}
                        className='product-input full-description-input'
                        placeholder='Полное описание'
                    />
                    <button type="submit" disabled={!isFormValid} className='product-button'>Добавить</button>
                    <button onClick={handleClose} className='product-close-button'>✖</button>
                </form>
            </div>
        </div>
    );
};

export default ProductAddModal;

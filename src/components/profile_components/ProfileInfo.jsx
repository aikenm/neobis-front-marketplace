import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg';
import defaultAvatar from '../../images/avatar.svg';
import { updateUser } from '../../store/userSlice';

function ProfileInfo() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(null); 
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user.name || '',
            surname: user.surname || '',
            login: user.login || '',
            number: user.number || '',
            email: user.email || ''
        }
    });

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target.result); 
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const onSubmit = (data) => {
        const userData = { ...data };
        delete userData.file; 
        dispatch(updateUser(userData));
    };

    return (
        <div className='content'>
            <div className='content-header'>
                <Link to="/main" className='profile-back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </Link>
                <span className='content-title'>Профиль</span>
            </div>
            <div className='content-section'>
                <div className='personal-info-avatar-block'>
                    <img src={selectedImage || defaultAvatar} alt='avatar' className='avatar'/> 
                    <input type="file" {...register('file')} id="file" name="file" onChange={onImageChange}  className='hidden-input-label'/>
                    <label htmlFor="file" className='file-label'>Выбрать фотографию</label>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='personal-info-block1'>
                        <input type="text" {...register('name')} placeholder="Name" className='personal-info-input'/>
                        <input type="text" {...register('surname')} placeholder="Surname" className='personal-info-input'/>
                        <input type="text" {...register('login')} placeholder="Login" className='personal-info-input'/>
                    </div>
                    <div className='personal-info-block2'>
                        <input type="text" {...register('number')} placeholder="Number" className='personal-info-input'/>
                        <input type="email" {...register('email')} placeholder="Email" className='personal-info-input'/>
                    </div>
                    <button type="submit" className='form-button save-button'>Save</button>
                </form>
            </div>
        </div>
    );
}

export default ProfileInfo;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg';
import defaultAvatar from '../../images/avatar.svg';
import { asyncUpdateUser, updateAvatar } from '../../store/userSlice';
import AddNumberModal from '../phone-number_components/AddNumberModal';
import ConfirmCodeModal from '../phone-number_components/ConfirmCodeModal';

function ProfileInfo() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(null); 
    const avatar = useSelector(state => state.user.avatar);

    const [showNumberModal, setShowNumberModal] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);

    const [enteredNumber, setEnteredNumber] = useState('');


    const { register, getValues } = useForm({
        defaultValues: {
            name: user.name || '',
            surname: user.surname || '',
            login: user.login || '',
            dob: user.dob || '',
            number: user.number || '',
            email: user.email || ''
        }
    });

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                setSelectedImage(e.target.result); 
                dispatch(updateAvatar(e.target.result)); 
            };
    
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    
    const handleAddNumber = () => {
        setShowNumberModal(true);  
    };

    const handleNext = (data) => {
        setShowNumberModal(false);
        setShowCodeModal(true);
        setEnteredNumber(data.modalNumber);
    };

    const handleConfirm = () => {
        setShowCodeModal(false);
    };

    const handleBlur = (fieldName) => {
        const value = getValues(fieldName);
        const updatedData = { [fieldName]: value }; 
        dispatch(asyncUpdateUser(updatedData));
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
                    <img src={avatar || defaultAvatar} alt='avatar' className='avatar'/> 
                    <input type="file" {...register('file')} id="file" name="file" onChange={onImageChange}  className='hidden-input-label'/>
                    <label htmlFor="file" className='file-label'>Выбрать фотографию</label>
                </div>
                
                <form>
                    <div className='personal-info-block1'>
                        <input type="text" {...register('name')} onBlur={() => handleBlur('name')} placeholder="Имя" className='personal-info-input'/>
                        <input type="text" {...register('surname')} onBlur={() => handleBlur('surname')} placeholder="Фамилия" className='personal-info-input'/>
                        <input type="text" {...register('login')} onBlur={() => handleBlur('login')} placeholder="Имя пользователя" className='personal-info-input'/>
                        <input type="date" {...register('dob')} onBlur={() => handleBlur('dob')} placeholder="Дата рождения" className='personal-info-input dob-input'/> 
                    </div>
                    <div className='personal-info-block2'>
                        <div className="number-field-wrapper">
                            <button type="button" onClick={handleAddNumber} className='add-number-button'>Добавить номер</button>
                            <input 
                                type="text" 
                                {...register('number')} 
                                value={user.number || ""} 
                                onBlur={() => handleBlur('number')} 
                                placeholder="0(000)000 000" 
                                className='personal-info-input number-field' 
                                disabled
                            />
                        </div>
                        <input type="email" {...register('email')} onBlur={() => handleBlur('email')} placeholder="Почта" className='personal-info-input'/>
                    </div>
                </form>
                {showNumberModal && <AddNumberModal onClose={() => setShowNumberModal(false)} onNext={handleNext} />}
                {showCodeModal && <ConfirmCodeModal onClose={() => setShowCodeModal(false)} onConfirm={handleConfirm} enteredNumber={enteredNumber} />}
            </div>
        </div>
    );
}

export default ProfileInfo;

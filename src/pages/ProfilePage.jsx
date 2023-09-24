import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import logo from '../images/logo.svg';
import ModalSignOutMessage from '../components/ModalSignOutMessage';
import { resetSteps } from '../store/signupSlice';
import { useDispatch } from 'react-redux';

function ProfilePage() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogoutConfirm = () => {
        dispatch(resetSteps());
        navigate('/');
    };

    return (
        <div className='profile-block-wrapper'>
            <h2 className='profile-block-title'>Добро пожаловать!</h2>
            <h3 className='profile-block-subtitle'>Lordby - Твой личный репетитор</h3>
            <img src={logo} alt="" className='logo-image' />
            <button 
                className='log-out-button' 
                onClick={() => setShowLogoutModal(true)}
            >
                Выйти
            </button>

            <ModalSignOutMessage 
                show={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={() => setShowLogoutModal(false)}
            />
        </div>
    );
}

export default ProfilePage;

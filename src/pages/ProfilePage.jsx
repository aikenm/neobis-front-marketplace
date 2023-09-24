import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import ModalSignOutMessage from '../components/ModalSignOutMessage';
import { resetSteps } from '../store/signupSlice';
import { useDispatch } from 'react-redux';
import ProfileInfo from '../components/ProfileInfo';
import Favorites from '../components/Favorites';
import UserItems from '../components/UserItems';
import favoritesIcon from '../images/favorites.svg';
import myItemsIcon from '../images/my-items.svg';
import logoutSmallIcon from '../images/logout-small.svg';
import arrowRightIcon from '../images/arrow-right.svg';
import avatar from '../images/avatar.svg';

function ProfilePage() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [activeComponent, setActiveComponent] = useState('profile');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const handleLogoutConfirm = () => {
        dispatch(resetSteps());
        navigate('/');
    };

    const renderRightComponent = () => {
        switch (activeComponent) {
            case 'profile':
                return <ProfileInfo />;
            case 'favorites':
                return <Favorites />;
            case 'userItems':
                return <UserItems />;
            default:
                return <ProfileInfo />;
        }
    };

    return (
        <div className='profile-page'>
            <div className="menu-section">
                <button onClick={() => setActiveComponent('profile')} 
                className={`profile-info-button ${activeComponent === 'profile' ? 'active-button' : ''}`}>
                    <img src={avatar} alt='avatar' className='avatar'/>
                    <div className='user-info'>
                        <span className='user-login'>{user.login}</span>
                        <span className='user-email'>{user.email}</span>
                    </div>
                </button>
                <button 
                    onClick={() => setActiveComponent('favorites')} 
                    className={`menu-button ${activeComponent === 'favorites' ? 'active-button' : ''}`}>
                        <img src={favoritesIcon} alt='icon' className='menu-icon'/>
                        Favorites
                        <img src={arrowRightIcon} alt='icon' className='arrow-right'/>
                </button>
                <button 
                    onClick={() => setActiveComponent('userItems')} 
                    className={`menu-button ${activeComponent === 'userItems' ? 'active-button' : ''}`}>
                        <img src={myItemsIcon} alt='icon' className='menu-icon'/>
                        My Items
                        <img src={arrowRightIcon} alt='icon' className='arrow-right'/>
                </button>
                <button 
                    onClick={() => setShowLogoutModal(true)}
                    className='menu-button log-out'>
                        <img src={logoutSmallIcon} alt='icon' className='menu-icon'/>
                        Выйти
                        <img src={arrowRightIcon} alt='icon' className='arrow-right'/>
                </button>
            </div>
            
            <div className="content-section">
                { renderRightComponent() }
            </div>

            <ModalSignOutMessage 
                show={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={() => setShowLogoutModal(false)}
            />
        </div>
    );
}

export default ProfilePage;

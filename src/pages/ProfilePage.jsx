import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetSteps } from '../store/signupSlice';
import { logoutUser } from '../store/userSlice';  
import ProfileInfo from './profile_subpages/ProfileInfo';
import Favorites from './profile_subpages/Favorites';
import UserItems from './profile_subpages/UserItems';
import LogOutModal from '../modal_windows/profile_modals/LogOutModal';
import favoritesIcon from '../images/favorites.svg';
import myItemsIcon from '../images/my-items.svg';
import logoutSmallIcon from '../images/logout-small.svg';
import arrowRightIcon from '../images/arrow-right.svg';
import defaultAvatar from '../images/avatar.svg';

function ProfilePage() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const initialActiveComponent = localStorage.getItem('activeComponent') || 'profile';
    const [activeComponent, setActiveComponent] = useState(initialActiveComponent);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const avatar = useSelector(state => state.user.avatar);

    const [navigationStack, setNavigationStack] = useState(['profile']);
    const navigationSet = new Set(navigationStack);
    
    const handleSetActiveComponent = (newComponent) => {
        setActiveComponent(newComponent);
        
        if (!navigationSet.has(newComponent)) {
            setNavigationStack(prevStack => [...prevStack, newComponent]);
            navigationSet.add(newComponent);
        }

        localStorage.setItem('activeComponent', newComponent);
    };
    
    
    const handleBackButton = () => {
        if (navigationStack.length > 1) {
            const updatedStack = [...navigationStack];
        
            if (updatedStack[updatedStack.length - 1] !== activeComponent) {
                const newStack = updatedStack.filter(comp => comp !== activeComponent);
                setActiveComponent(newStack[newStack.length - 1]);
                setNavigationStack(newStack);
            } else {
                updatedStack.pop();
                setActiveComponent(updatedStack[updatedStack.length - 1]);
                setNavigationStack(updatedStack);
            }
    
            localStorage.setItem('activeComponent', updatedStack[updatedStack.length - 1]);
        } else {
            navigate('/main');
        }
    };
      

    const handleLogoutConfirm = () => {
        dispatch(resetSteps());
        dispatch(logoutUser());
        navigate('/');
    };

    const renderRightComponent = () => {
        switch (activeComponent) {
            case 'profile':
                return <ProfileInfo handleBack={handleBackButton} />;
            case 'favorites':
                return <Favorites handleBack={handleBackButton} />;
            case 'userItems':
                return <UserItems handleBack={handleBackButton} />;
            default:
                return <ProfileInfo handleBack={handleBackButton} />;
        }
    };

    return (
        <div className='main'>
            <div className="menu-section">
                <button onClick={() => handleSetActiveComponent('profile')} 
                className={`profile-info-button ${activeComponent === 'profile' ? 'active-button' : ''}`}>
                    <img src={(avatar && avatar !== 'https://res.cloudinary.com/dpcjm5ifg/image/upload/v1/media/avatar_images/avatar.jpg') ? avatar : defaultAvatar} alt='avatar' className='avatar'/> 
                    <div className='user-info'>
                        <span className='user-login'>{user.username}</span>
                        <span className='user-email'>{user.email}</span>
                    </div>
                </button>
                <button 
                    onClick={() => handleSetActiveComponent('favorites')}  
                    className={`menu-button ${activeComponent === 'favorites' ? 'active-button' : ''}`}>
                        <img src={favoritesIcon} alt='icon' className='menu-icon'/>
                        Понравившиеся
                        <img src={arrowRightIcon} alt='icon' className='arrow-right'/>
                </button>
                <button 
                    onClick={() => handleSetActiveComponent('userItems')} 
                    className={`menu-button ${activeComponent === 'userItems' ? 'active-button' : ''}`}>
                        <img src={myItemsIcon} alt='icon' className='menu-icon'/>
                        Мои товары
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

            <LogOutModal 
                show={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={() => setShowLogoutModal(false)}
            />
        </div>
    );
}

export default ProfilePage;

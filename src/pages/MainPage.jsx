import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import avatar from '../images/avatar.svg';
import miniLogo from '../images/mini-logo.svg';


function MainPage() {
    const user = useSelector(state => state.user);
    
    return (
        <div className='main-page'>
            <div className='header'>
                <div className='header-logo'>
                    <img src={miniLogo} alt='logo' className='main-logo-icon' />
                    <span className='header-logo-text'>MOBI MARKET</span>
                </div>
                <button 
                    className='form-button add-item-button' >
                        Подать обьявление
                </button>
                <Link to="/profile" className='main-profile-button'>
                    <div className='profile-info'>
                        <span className='user-login'>{user.login}</span>
                        <span className='user-email'>{user.email}</span>
                    </div>
                    <img src={avatar} alt='avatar' className='avatar'/>
                </Link>
            </div>
            <div className='items-section'>
                <h1>sec</h1>
            </div>
        </div>
    );
}

export default MainPage;

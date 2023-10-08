import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg';

function Favorites() {
    return (
        <div className='content'>
            <div className='content-header'>
                <Link to="/main" className='profile-back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </Link>
                <span className='content-title'>Понравившиеся</span>
            </div>
            <div className='content-section'>
                
            </div>
        </div>
    );
}

export default Favorites;

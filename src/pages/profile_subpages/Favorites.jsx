import React from 'react';
import arrow from '../../images/arrow.svg';

function Favorites({ handleBack }) {
    return (
        <div className='content'>
            <div className='content-header'>
                <button onClick={handleBack} className='profile-back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </button>
                <span className='content-title'>Понравившиеся</span>
            </div>
            <div className='content-section'>
                
            </div>
        </div>
    );
}

export default Favorites;

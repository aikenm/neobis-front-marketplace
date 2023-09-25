import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg'

function ProfileInfo() {
    const user = useSelector(state => state.user);

    return (
        <div>
            <Link to="/main" className='back-button'>
                <img src={arrow} alt="back" className='arrow-icon'/>
                <span className='arrow-text'>Назад</span>
            </Link>
            <h2>Profile Info</h2>
            <p>Login: {user.login}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default ProfileInfo;

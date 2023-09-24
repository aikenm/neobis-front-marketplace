import React from 'react';
import { useSelector } from 'react-redux';

function ProfileInfo() {
    const user = useSelector(state => state.user);

    return (
        <div>
            <h2>Profile Info</h2>
            <p>Login: {user.login}</p>
            <p>Email: {user.email}</p>
            {/* Add other profile-related info here */}
        </div>
    );
}

export default ProfileInfo;

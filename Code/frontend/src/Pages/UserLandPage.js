import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const UserLandPage = () => {
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <Navigate to='/rooms/public/1'/>
    )
}

export default UserLandPage
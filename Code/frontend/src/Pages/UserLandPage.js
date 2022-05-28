import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import api from '../Api/api';

const UserLandPage = () => {
    let user = Cookies.get('username');
    let admin = Cookies.get('admin')

    const banCheck = async() => {
        const data = api.userGetByUsername(user)

        if (data.data[0].status === 0) {
            return <Navigate to='/banned'/>
        } else {
            return <Navigate to='/rooms/public/1' />
        }
    }
    
    if (user !== undefined && admin) {
        return <Navigate to='/admin/notices/latest/1' />
    } else if (user !== undefined && !admin) {
        banCheck();
    }

    return (
        <Navigate to='/login'/>
    )
}

export default UserLandPage
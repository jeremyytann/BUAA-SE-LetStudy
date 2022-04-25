import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const AdminLandPage = () => {
    let user = Cookies.get('username');
    let admin = Cookies.get('admin')
    
    if (user !== undefined && admin) {
        return <Navigate to='/admin/notices/latest/1' />
    } else if (user !== undefined && !admin) {
        return <Navigate to='/rooms/public/1' />
    }

    return (
        <Navigate to='/admin/login'/>
    )
}

export default AdminLandPage
import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Box } from '@mui/material';

const UserHomePage = () => {
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <Box>
            <Navbar />
            {user} logged in.
        </Box>
    )
}

export default UserHomePage
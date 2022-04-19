import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import UserQuestionBody from '../Components/UserQuestionBody';
import HomeFlipPage from '../Components/HomeFlipPage';

const UserQuestionPage = () => {
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <Box>
            <Navbar />
            <HomeTab url={'questions'}/>
            <HomeSubTab url={'questions'}/>
            <UserQuestionBody />
            <HomeFlipPage url={'questions'}/>
        </Box>
    )
}

export default UserQuestionPage
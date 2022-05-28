import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import UserQuestionBody from '../Components/UserQuestionBody';
import HomeFlipPage from '../Components/HomeFlipPage';
import api from '../Api/api';

const UserQuestionPage = () => {
    let user = Cookies.get('username');

    const banCheck = async() => {
        const data = api.userGetByUsername(user)

        if (data.data[0].status === 0) {
            return <Navigate to='/banned'/>
        }
    }

    if (user === undefined) {
        return <Navigate to='/login'/>
    } else {
        banCheck();
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
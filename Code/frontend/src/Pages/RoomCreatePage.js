import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import RoomCreateBody from '../Components/RoomCreateBody';
import { Navigate } from 'react-router-dom';
import api from '../Api/api';
import Cookies from 'js-cookie'

const RoomCreatePage = () => {
    let user = Cookies.get('username')

    const banCheck = async() => {
        const data = api.userGetByUsername(user)

        if (data.data[0].status === 0) {
            return <Navigate to='/banned'/>
        }
    }

    banCheck();

    return (
        <Box>
            <Navbar />
            <HomeTab url={'rooms'}/>
            <HomeSubTab url={'roomsCreate'}/>
            <RoomCreateBody />
        </Box>
    )
}

export default RoomCreatePage
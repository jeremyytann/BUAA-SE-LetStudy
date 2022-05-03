import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import RoomCreateBody from '../Components/RoomCreateBody';

const RoomCreatePage = () => {
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
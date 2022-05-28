import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie';
import { Navigate, useParams } from 'react-router-dom';
import HomeTab from '../Components/HomeTab';
import HomeSubTab from '../Components/HomeSubTab';
import NoteCreatePage from './NoteCreatePage';
import { Box } from '@mui/material';
import UserNoteBody from '../Components/UserNoteBody';
import HomeFlipPage from '../Components/HomeFlipPage';
import api from '../Api/api';

const UserNotePage = () => {
    const { tab } = useParams();
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
    
    if (tab === 'create') {
        return <NoteCreatePage action={tab}/>
    }

    return (
        <Box>
            <Navbar />
            <HomeTab url={'notes'} />
            <HomeSubTab url={'notes'}/>
            <UserNoteBody />
            <HomeFlipPage url={'notes'}/>
        </Box>
    )
}

export default UserNotePage
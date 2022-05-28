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

const UserNotePage = () => {
    const { tab } = useParams();
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
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
import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';
import AdminHomeSubTab from '../Components/AdminHomeSubTab';
import AdminUserBody from '../Components/AdminUserBody';
import AdminHomeFlipPage from '../Components/AdminHomeFlipPage';

const AdminUserPage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url={'users'} />
            <AdminHomeSubTab url={'users'} />
            <AdminUserBody />
            <AdminHomeFlipPage url={'users'} />
        </Box>
    )
}

export default AdminUserPage
import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';
import AdminHomeSubTab from '../Components/AdminHomeSubTab';

const AdminUserPage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url={'users'} />
            <AdminHomeSubTab url={'users'} />
        </Box>
    )
}

export default AdminUserPage
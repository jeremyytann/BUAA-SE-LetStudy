import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';

const AdminUserPage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url='users'/>
            
        </Box>
    )
}

export default AdminUserPage
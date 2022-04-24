import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';

const AdminNoticePage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url='notices'/>
            
        </Box>
    )
}

export default AdminNoticePage
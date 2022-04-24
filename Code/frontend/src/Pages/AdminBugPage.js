import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import AdminHomeTab from '../Components/AdminHomeTab';

const AdminBugPage = () => {
    return (
        <Box>
            <Navbar />
            <AdminHomeTab url='bugs'/>
            
        </Box>
    )
}

export default AdminBugPage